import styles from './Header.module.css';

function Header() {
    return (
        <header className={styles.header}>
            header
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;