// import logo from './logo.svg';
import './App.css';
import LikeButton from './LikeButton.js'; // Update path if necessary

const App = () => {
    return (
        <div style={styles.appContainer}>
            <h1>React Like Button</h1>
            <LikeButton />
        </div>
    );
};

const styles = {
    appContainer: {
        textAlign: 'center',
        marginTop: '50px',
    },
};

export default App;
