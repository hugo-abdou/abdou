<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' =>  $this->name,
            'company' => "Yotz PVT LTD",
            'role' => "editor",
            'country' => "El Salvador",
            'contact' => "(479) 232-9151",
            'email' => $this->email,
            'currentPlan' => "enterprise",
            'status' => "inactive",
            'billing' => "Auto Debit",
            'avatar' => $this->profile_photo_url
        ];
    }
}
