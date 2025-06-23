import axios from "axios";

import { FileLoader } from "@ckeditor/ckeditor5-upload";

export class EditorUploadAdapter {
    constructor(private loader: FileLoader) {}

    async upload() {
        const file = await this.loader.file;

        if (!file) {
            return Promise.reject("파일이 null입니다.");
        }
        
        const formData = new FormData();
        formData.append("upload", file);

        const response = await axios.post(
            "https://bluecool.pyomin.com/api/admin/images",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            }
        );

        return {
            default: response.data.url,
        };
    }

    abort() {}
}