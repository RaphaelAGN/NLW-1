import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';
import './styles.css';


interface Props {
    onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ( { onFileUploaded } ) => {
    const [selectedFileUrl, setSelectedFileUrl] = useState('');

    const onDrop = useCallback(acceptedFiles => {
        //recebe apenas um arquivo, sempre estará na posição 0
        //Caso quisesse vários arquivos, propriedade multiple no input
        const file = acceptedFiles[0];

        //Criação da url do arquivo
        const fileUrl = URL.createObjectURL(file);
        setSelectedFileUrl(fileUrl);
        onFileUploaded(file);
    }, [onFileUploaded]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*'
    })

    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept="image/*" />

            { selectedFileUrl 
                ? <img src={selectedFileUrl} alt="Point thumbnail"/>
                : (
                  <p>
                    <FiUpload />
                    Imagem do estabelecimento
                  </p>
                )
            }
   
        </div>
    )
}

export default Dropzone;