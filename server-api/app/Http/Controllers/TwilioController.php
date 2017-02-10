<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use URL;
use Html;
use Illuminate\Support\HtmlString;

use App\Http\Requests;

use pimax\FbBotApp;
use pimax\Messages\Message;
use pimax\Messages\StructuredMessage;
use pimax\Messages\MessageButton;

use pimax\Messages\QuickReplyButton;
use pimax\Messages\QuickReplyMessage;


use App\Modules\Services\BotUsersService;
use App\Modules\Services\ChatVersionService;
use App\Modules\Api\UserResponse;
use App\Modules\Api\ApiRequestProcessor;
use App\Modules\Api\ApiResponse;


use
    Twilio\Rest\Client;

const TWILIO_SID = "AC664b7d1918b09e5112d25f47cb98a8ff"; // Your Account SID from www.twilio.com/console
const TWILIO_TOKEN = "c01df3ba273e5c0cdcdfc011e1e2a1b3"; // Your Auth Token from www.twilio.com/console
const TWILIO_PHONE = "+19726657588"; // Your valid Twilio number


use Twilio\Domain;
use Twilio\Twiml;

class TwilioController extends Controller
{

    // Send an SMS using Twilio's REST API
    public function send_sms($phone,$text) {

        $client = new Client(TWILIO_SID, TWILIO_TOKEN);
        $message = $client->messages->create(
            $phone, // Text this number
         array(
            'from' => TWILIO_PHONE, // From a valid Twilio number
            'body' => $text,
            )
        );
    }

    public function messenger(Request $request)
    {

  //      Log::info('request:'.print_r($request, true));

        //$data = json_decode($request->getContent(),true);
        //Log::info('data:'.print_r($data, true));

        $input_sms = $request['Body'];
        $from = $request['From'];

        if (trim($input_sms)=='') {
            return '';
        }

        Log::info('from:'.print_r($from, true));
        Log::info('input_sms:'.print_r($input_sms, true));



        //--------------------------------------------------------------------------------
        // Create user response & process it

        $text = $input_sms;
        $button_id = null;

        $botUsersService = new BotUsersService();
        $user = $botUsersService->getOrCreatePhoneUser($from);

        $chatVersionService = new ChatVersionService();
        $activeChatVersion = $chatVersionService->getActive();
        $userResponse = new UserResponse($text, $button_id, $activeChatVersion);

        $apiRequestProcessor = new ApiRequestProcessor($user);
        $response = $apiRequestProcessor->processRequest($userResponse, $button_id);

        $response_text = $response->getMessage();

        Log::info('response:'.print_r($response_text, true));

        ////--------------------------------------------------------------------------------

        $response = new Twiml;
        $response->message($response_text);
        return $response;
    }


    public function fb_messenger(Request $request)
    {

        if (!empty($request->hub_mode) && $request->hub_mode == 'subscribe' && $request->hub_verify_token == FB_VERIFY_TOKEN) {
            return $request->hub_challenge;
        }

        $data = json_decode($request->getContent(),true);

        //Log::info('data:'.print_r($data, true));

        if (!isset($data['entry'])) {
            return '';
        }

        $entry = $data['entry'];

        $entry_0 = $entry[0];

        //Log::info('entry:'.print_r($entry_0, true));

        $messaging = $entry_0['messaging'];

        //Log::info('messaging:'.print_r($messaging, true));

        //return '';


        foreach ($messaging as $message) {

            // Skipping delivery messages
            if (!empty($message['delivery'])) {
                continue;
            }

            // User input -------------------------------------------------
            
            $user_fb_id = $message['sender']['id'];
            $text = "";
            $button_id_text = "";

            Log::info('message: '.print_r($message, true));

            // When bot receive message from user
            if (!empty($message['message'])) {
                
                $text = $message['message']['text'];
                
                // When bot receive quick reply click from user
                if (!empty($message['message']['quick_reply'])) {
                    $button_id_text = $message['message']['quick_reply']['payload'];
                    Log::info('quick reply: ' . print_r($button_id_text, true));
                }
                
            // When bot receive button click from user
            } else if (!empty($message['postback'])) {
                
                $button_id_text = $message['postback']['payload'];
                Log::info('postback: '.print_r($button_id_text, true));

            }
            $button_id = $button_id_text == '' ? null : intval($button_id_text);

            // Chat api -------------------------------------------------

            // Get user for this connection
            $botUsersService = new BotUsersService();
            $user = $botUsersService->getOrCreateFbUser($user_fb_id);

            // Create user response & process it
            $chatVersionService = new ChatVersionService();
            $activeChatVersion = $chatVersionService->getActive();
            $userResponse = new UserResponse($text, $button_id, $activeChatVersion);

            $apiRequestProcessor = new ApiRequestProcessor($user);
            $response = $apiRequestProcessor->processRequest($userResponse, $button_id);

            //$bot = new FbBotApp(FB_PAGE_TOKEN);
            //$text = $response->getUser()->fb_id;
            //$bot->send(new Message($user_fb_id, $text));
            //return '';

            $res = $this->_fbQuickResponse($response);

            // Send bot's answer
            $bot = new FbBotApp(FB_PAGE_TOKEN);
            $bot->send($res);

            // -----------------------------------------------------------
/*
            $bot = new FbBotApp(FB_PAGE_TOKEN);
            $bot->send(new StructuredMessage($message['sender']['id'],
                StructuredMessage::TYPE_BUTTON,
                [
                    'text' => $command,
                    'buttons' => [
                        new MessageButton(MessageButton::TYPE_POSTBACK, 'First button'),
                        new MessageButton(MessageButton::TYPE_POSTBACK, 'Second button'),
                        new MessageButton(MessageButton::TYPE_POSTBACK, 'Third button')
                       // new MessageButton(MessageButton::TYPE_POSTBACK, 'Forth button')
                    ]
                ]
            ));

*/
            //Log::info('message: '.print_r($message, true));
            /*[2017-02-04 18:07:35] local.INFO: message: Array
            (
                [sender] => Array
                (
                    [id] => 1199031033545339

            )

                [recipient] => Array
            (
                [id] => 183246065485521
            )

            [timestamp] => 1486231655482
            [message] => Array
                (
                    [mid] => mid.1486231655482:42f3af9e88
                    [seq] => 53
                    [text] => Hello 18
                )
*/


//            $bot = new FbBotApp(FB_PAGE_TOKEN);
//            $bot->send(new Message($message['sender']['id'], $command));


        }

        return '';
    }


    private function _fbResponse(ApiResponse $apiResponse)
    {
        $fb_id = $apiResponse->getUser()->fb_id;
        $text  = $apiResponse->getMessage();

        $answerButtons = $apiResponse->getAnswerButtons();

        if (count($answerButtons) > 0) {

            $answerButtonsFormatted = [];
            foreach ($answerButtons as $answerButton) {
                if (count($answerButtonsFormatted) < 3) {
                    $btn = new MessageButton(MessageButton::TYPE_POSTBACK, $answerButton->text,$answerButton->id);
                    array_push($answerButtonsFormatted,$btn);
                }
            }

            $msg = new StructuredMessage($fb_id,
                StructuredMessage::TYPE_BUTTON,
                [
                    'text' => $text,
                    'buttons' => $answerButtonsFormatted
                ]
            );
        }
        else {  // simple text
          $msg = new Message($fb_id, $text);
        };

        return $msg;
    }

    private function _fbQuickResponse(ApiResponse $apiResponse)
    {
        $fb_id = $apiResponse->getUser()->fb_id;
        $text  = $apiResponse->getMessage();

        $answerButtons = $apiResponse->getAnswerButtons();

        if (count($answerButtons) > 0) {

            $answerButtonsFormatted = [];
            foreach ($answerButtons as $answerButton) {
                if (count($answerButtonsFormatted) < 5) {
                    $btn = new QuickReplyButton(QuickReplyButton::TYPE_TEXT, $answerButton->text,$answerButton->id);
                    array_push($answerButtonsFormatted,$btn);
                }
            }

            $msg = new QuickReplyMessage($fb_id,
                [
                    'text' => $text,
                    'buttons' => $answerButtonsFormatted
                ]
            );
        }
        else {  // simple text
            $msg = new Message($fb_id, $text);
        };

        return $msg;

    }

}
