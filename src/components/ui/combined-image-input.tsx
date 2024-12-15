"use client";

import { useState } from "react";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { X, Link, Upload } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

interface CombinedImageInputProps {
    value: string;
    onChange: (url: string) => void;
}

export function CombinedImageInput({
    value,
    onChange
}: CombinedImageInputProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [urlInput, setUrlInput] = useState(value || "");

    const handleUrlSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onChange(urlInput);
    };

    return (
        <div className="space-y-4">
            {value && (
                <div className="relative w-40 h-40 mx-auto">
                    <img
                        src={value}
                        alt="Preview"
                        className="object-cover rounded-lg"
                    />
                    <Button
                        onClick={() => {
                            onChange("");
                            setUrlInput("");
                        }}
                        className="absolute -top-2 -right-2 p-1 rounded-full"
                        variant="destructive"
                        size="sm"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}

            {!value && (
                <Tabs defaultValue="url" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="url">
                            <Link className="h-4 w-4 mr-2" />
                            URL
                        </TabsTrigger>
                        <TabsTrigger value="upload">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="url">
                        <form className="flex gap-2">
                            <Input
                                type="url"
                                placeholder="Enter image URL..."
                                value={urlInput}
                                onChange={(e) => setUrlInput(e.target.value)}
                            />
                            <Button onClick={handleUrlSubmit}>Set</Button>
                        </form>
                    </TabsContent>
                    <TabsContent value="upload">
                        <div className="flex items-center justify-center">
                            <UploadButton<OurFileRouter, "imageUploader">
                                endpoint="imageUploader"
                                onUploadBegin={() => setIsUploading(true)}
                                onClientUploadComplete={(res) => {
                                    setIsUploading(false);
                                    onChange(res?.[0].url || "");
                                }}
                                onUploadError={(err) => {
                                    setIsUploading(false);
                                    console.error(err);
                                }}
                            />
                        </div>
                        {isUploading && (
                            <div className="text-center text-sm text-gray-500 mt-2">
                                Uploading...
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            )}
        </div>
    );
}
