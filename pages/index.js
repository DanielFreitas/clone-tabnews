function Home() {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Olha isso Kau, eu oficialmente conquistei a internet, a concorrência que se prepare…</h1>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '100%', marginTop: '20px', borderRadius: '10px' }}>
                <iframe
                    src="https://www.youtube.com/embed/tFn8561bnYY?autoplay=1"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}                    
                ></iframe>
            </div>
        </div>
    );
}

export default Home;
