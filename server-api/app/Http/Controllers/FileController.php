<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use URL;
use Html;
use Illuminate\Support\HtmlString;

use App\Http\Requests;

class FileController extends Controller
{

    protected function destinationPath() {
        return realpath(base_path('storage/app/public/images'));
    }

    public function errorWithSubject($error) {

        return response()->json(['error'=> $error,'subject'=>'image upload']);
    }

    public function image(Request $request,$fileId) {

        $pathToFile = $this->destinationPath().'/'.$fileId;

        return response()
           //->withHeaders('Access-Control-Allow-Origin', '*')  //, $headers);
           //->file($pathToFile,['Access-Control-Allow-Origin' => '*']); //, $headers);
           ->file($pathToFile); //, $headers);
    }

    public function pwb_image(Request $request,$fileId) {

        $pathToFile = $this->destinationPath().'/'.$fileId;

        return response()
            //->withHeaders('Access-Control-Allow-Origin', '*')  //, $headers);
            ->file($pathToFile);
    }




    public function upload(Request $request)
    {
        $image = 'file';

        if (!$request->hasFile($image)) {
            return $this->errorWithSubject('No file');
        }

        $file = $request->file($image);

        if (!$file->isValid()) {
            return $this->errorWithSubject('Bad file ');
        }

        $fileName = $file->getClientOriginalName();
        $fileExt = $file->getClientOriginalExtension();

        $fileId = uniqid('img').'.'.$fileExt;
        $file->move($this->destinationPath(), $fileId);

        $query = 'image/'.$fileId;
        $url = url('/api/image/'.$fileId);



        $link = '<img src="' . $url . '" alt="' .$fileName.'"">';

        return response()->json([ 'link'=> $link, 'src'=> $query, 'alt'=> $url ]);

        return new HtmlString($link);

    }
}
