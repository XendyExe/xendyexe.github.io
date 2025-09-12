import React, { useCallback, useEffect, useState } from "react";
import { AMF3Writer } from "./AMF3Writer";
import { useDropzone } from "react-dropzone";

const BASE_SAVE = {
    explorewormholeCrossing: 1,
    lastBuildNumber: 25014,
    currentCharacter: 0,
    controlScheme: 0,
    firstPlayTime: "2025-09-12T22:40:51Z",
    currentPath: "primary",
};

export default function SolEditor() {
    const [errors, setErrors] = useState<string | null>(null);
    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;
        if (acceptedFiles.length > 1) {
            setErrors(`Too many files, please only upload one json at a time\n\nError at ${Date.now()}`)
            return;
        }
        try {
            const object = JSON.parse(await file.text());
            const flattened = Object.assign({ ...BASE_SAVE }, ...Object.values(object));

            console.log(flattened);
            setJsonData(flattened);
            setErrors(null)
        } catch (e) {
            setErrors(`Failed to parse json: ${e}\nCheck console for more information.\n\nError at: ${Date.now()}`)
            console.log(e);
        }
    }, []);
    const { getRootProps, getInputProps, isDragActive  } = useDropzone({
        onDrop,
        accept: {
            "application/json": [".json"],
        }
    });

    const [jsonData, setJsonData] = useState<any | null>(null);
    function exportSOL() {
        if (!jsonData) return;
        console.log("exporting", jsonData);
        new AMF3Writer().createDownloadableSOL("Run3.sol", "Run3", jsonData);
    }

    return (
        <div className="react-container">
            <div {...getRootProps()} className="drag-and-drop">
                <input {...getInputProps()} />
                <p>Drag and drop json file here...</p>
                <p>or click to upload</p>
            </div>
            {
                errors && <div className="error-container">
                    <h3>Encountered an error while parsing</h3>
                    <pre>{errors}</pre>
                </div>
            }
            {jsonData && (
                <>
                    <button onClick={exportSOL} className="download-button">
                        Download converted Run3.sol
                    </button>
                    <pre className="">{JSON.stringify(jsonData, null, 2)}</pre>
                </>
            )}
        </div>
    );
}
