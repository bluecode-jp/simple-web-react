import styles from './Contact.module.css';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

function Contact() {

    // react-hook-formの設定
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: "onChange" });
    // ボタン制御のため追加
    const [isSubmit, setIsSubmit] = useState(false); // 送信中か？
    const [buttonText, setButtonText] = useState("問い合わせる"); // ボタンのテキスト表示変更用

    // 問合せクリック時（formサブミット時）
    const _onSubmit = async (data) => {

        // 状態変更
        setIsSubmit(true);
        setButtonText("送信中・・・")

        // sleep
        // await new Promise(resolve => setTimeout(resolve, 2000));

        // 値の表示（OKだったときの処理）
        // alert(`title=${data.title}, email=${data.email}, message=${data.message}`);

        // API連携
        const api_url = "http://localhost:3333/contacts";

        try {
            // API問い合wせ
            const result = await fetch(api_url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    title: data.title,
                    email: data.email,
                    message: data.message
                })
            });

            // 結果をJSONにして取得
            const json = await result.json();

            // メッセージをalertで表示
            alert(json.message);

            // 値のリセット（場所移動：成功時のみリセット）
            reset();

        } catch (error) {
            // エラーならエラー内容表示
            alert(error.message);
        }

        // 状態戻し
        setButtonText("問い合わせる");
        setIsSubmit(false);
    }

    return (
        <main>
            <section className={styles.hero}>
                <h1>お問い合わせフォーム</h1>
                <p>お気軽にお問い合わせ下さい</p>
            </section>
            <section className={styles.formContainer}>
                <form className={styles.contactForm} onSubmit={handleSubmit(_onSubmit)}>

                    <label htmlFor='title'>お問い合わせタイトル</label>
                    <input type='text' id='title' {...register("title", {
                        required: "お問い合わせタイトルは必須です。",
                        maxLength: {
                            value: 10,
                            message: "10文字以内で入力して下さい。"
                        }
                    })} />
                    {errors.title && <p className={styles.errorMessage}>{errors.title.message}</p>}

                    <label htmlFor='email'>Email</label>
                    <input type='text' id='email' {...register("email", {
                        required: "Emailは必須です。",
                        pattern: {
                            value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                            message: "Emailを正しい形式で入力して下さい。"
                        }
                    })} />
                    {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}

                    <label htmlFor='message'>お問い合わせ内容</label>
                    <textarea id='message' rows={5} {...register("message", {
                        required: "お問い合わせ内容は必須です。",
                        maxLength: {
                            value: 20,
                            message: "20文字以内で入力して下さい。"
                        }
                    })}></textarea>
                    {errors.message && <p className={styles.errorMessage}>{errors.message.message}</p>}

                    {/* 状態によりボタンの表示を変更 */}
                    <button type='submit' id='button' disabled={isSubmit}>{buttonText}</button>

                </form>
            </section>
        </main>
    );
}

export default Contact;