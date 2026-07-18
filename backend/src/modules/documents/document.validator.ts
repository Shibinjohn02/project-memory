import { UploadDocumentRequest } from "./document.types";

export const documentValidator = {
    validateUpload(data: UploadDocumentRequest) {
        if (!data.source) {
            throw new Error("Document source is required.");
        }

        return data;
    },
};