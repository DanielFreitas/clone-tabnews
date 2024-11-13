import React, { useState } from 'react';
import ReactPlayer from 'react-player';

function Home() {
    const [videoFile, setVideoFile] = useState(null);
    const [videoDetails, setVideoDetails] = useState(null);
    const idealAspectRatio = 0.5; // Proporção ideal para 300x600 (1:2)

    const handleVideoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const videoURL = URL.createObjectURL(file);
            setVideoFile(videoURL);

            const videoElement = document.createElement("video");
            videoElement.src = videoURL;

            videoElement.onloadedmetadata = () => {
                const aspectRatio = (videoElement.videoWidth / videoElement.videoHeight).toFixed(2);
                const details = {
                    filename: file.name,
                    video_format: file.type,
                    resolution: `${videoElement.videoWidth}x${videoElement.videoHeight}`,
                    aspect_ratio: aspectRatio,
                    size_in_mb: (file.size / (1024 * 1024)).toFixed(2),
                    duration_in_sec: videoElement.duration.toFixed(2),
                    isAspectRatioIdeal: aspectRatio == idealAspectRatio.toFixed(2)
                };
                setVideoDetails(details);
            };
        }
    };

    return (
        <div className="text-center p-6">
            <h1 className="text-2xl font-bold mb-6">
                Olha isso Kau, eu oficialmente conquistei a internet, a concorrência que se prepare…
            </h1>

            <div className="mb-6">
                <label className="block mb-2 text-lg font-semibold">Suba seu próprio vídeo:</label>
                <p className="text-sm text-gray-600 mb-2">
                    Para melhor encaixe, use vídeos com proporção de 1:2 (exemplo: 300x600, 480x960, ou 600x1200 pixels).
                </p>
                <input type="file" accept="video/mp4" onChange={handleVideoUpload} className="block mx-auto" />
            </div>

            {videoFile && (
                <div className="flex flex-col md:flex-row items-center justify-center mt-8 space-y-6 md:space-y-0 md:space-x-8">
                    {/* Contêiner do player de vídeo com estilo de celular */}
                    <div className="relative w-72 h-[600px] rounded-lg overflow-hidden shadow-lg bg-black">
                        <ReactPlayer
                            url={videoFile}
                            controls
                            width="100%"
                            height="100%"
                            style={{ objectFit: 'cover' }}
                        />
                    </div>

                    {/* Detalhes do vídeo ao lado do player */}
                    {videoDetails && (
                        <div className="text-left max-w-xs">
                            <h3 className="text-lg font-semibold mb-4">Detalhes do Vídeo:</h3>
                            <p><strong>Nome do arquivo:</strong> {videoDetails.filename}</p>
                            <p><strong>Formato:</strong> {videoDetails.video_format}</p>
                            <p><strong>Resolução:</strong> {videoDetails.resolution}</p>
                            <p><strong>Proporção (Aspect Ratio):</strong> {videoDetails.aspect_ratio}</p>
                            <p><strong>Tamanho:</strong> {videoDetails.size_in_mb} MB</p>
                            <p><strong>Duração:</strong> {videoDetails.duration_in_sec} segundos</p>
                            <p>
                                <strong>Status de Encaixe:</strong>{" "}
                                {videoDetails.isAspectRatioIdeal
                                    ? "Este vídeo está bem encaixado no player."
                                    : "Este vídeo pode não preencher o player corretamente. Recomendado: 1:2 (0.5)"}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Home;
