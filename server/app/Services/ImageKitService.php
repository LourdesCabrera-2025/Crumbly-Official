<?php

namespace App\Services;

use ImageKit\ImageKit;

class ImageKitService
{
    protected $imageKit;

    public function __construct()
    {
        $this->imageKit = new ImageKit(
            env('IMAGEKIT_PUBLIC_KEY'),
            env('IMAGEKIT_PRIVATE_KEY'),
            env('IMAGEKIT_URL_ENDPOINT')
        );
    }

    public function upload($file, $folder = "clientes")
    {
        $fileData = file_get_contents($file);

        $upload = $this->imageKit->upload([
            "file" => base64_encode($fileData),
            "fileName" => time() . "_" . $file->getClientOriginalName(),
            "folder" => "/" . $folder
        ]);

        if (!isset($upload->success)) {
            return null;
        }

        return $upload->success->url; 
    }
}
