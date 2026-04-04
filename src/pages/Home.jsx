import styles from './Home.module.css';

function Home() {
    return (
        <main>
            <section className={styles.hero}>
                <h1>ヒーローエリア</h1>
                <p>ヒーローエリアのキャッチコピー</p>
            </section>
            <section className={styles.services}>
                <div className={styles.service}>
                    <h2>サービスA</h2>
                    <p>サービスAの紹介</p>
                </div>
                <div className={styles.service}>
                    <h2>サービスB</h2>
                    <p>サービスBの紹介</p>
                </div>
                <div className={styles.service}>
                    <h2>サービスC</h2>
                    <p>サービスCの紹介</p>
                </div>
            </section>
        </main>
    );
}

export default Home;