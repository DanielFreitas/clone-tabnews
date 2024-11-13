import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import styles from './Home.module.css'; // Importa o CSS Module

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
        <div className={styles.homeContainer}>
            <h1>Olha isso Kau, eu oficialmente conquistei a internet, a concorrência que se prepare…</h1>

            <div className={styles.uploadSection}>
                <label>Suba seu próprio vídeo:</label>
                <p className={styles.instruction}>
                    Para melhor encaixe, use vídeos com proporção de 1:2 (exemplo: 300x600, 480x960, ou 600x1200 pixels).
                </p>
                <input type="file" accept="video/mp4" onChange={handleVideoUpload} />
            </div>

            {videoFile && (
                <div className={styles.playerAndDetails}>
                    <div className={styles.videoPlayerContainer}>
                        <ReactPlayer
                            url={videoFile}
                            controls
                            width="100%"
                            height="100%"
                            style={{ objectFit: 'cover' }}
                        />
                    </div>

                    {videoDetails && (
                        <div className={styles.videoDetails}>
                            <h3>Detalhes do Vídeo:</h3>
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
