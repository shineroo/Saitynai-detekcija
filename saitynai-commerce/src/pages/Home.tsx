import { Container } from 'react-bootstrap'
import hero from '../assets/hero.jpg'

export default function Home() {
    return <>
        <div className='hero-container'>
            <img src={hero}  className='image-container'/>
        </div>
        
        <div className='overlay-element'>
            <h1>Detection</h1>

            <h3>We've got cameras. You want them.</h3>
            <a className='btn btn-primary google-button' href="/catalog">Go to Catalog</a>
        </div>
        
        <div className='page-container main-page-whatever'>
            <div>
                <h1>We're pretty good at what we do:</h1>
                <ul>
                    <li>Example 1</li>
                    <li>Example 2</li>
                    <li>Example 3</li>
                    <li>Example 4</li>
                    <li>Example 5</li>
                    <li>Example 6</li>
                    <li>Example 11</li>
                    <li>Example 45</li>
                    <li>Example 75</li>
                    <li>Example 100</li>

                    <li>Example 1121</li>
                    <li>Example 12311</li>
                    <li>Example 12312</li>
                </ul>
            </div>
            <div>
                <img src="https://thumbs.dreamstime.com/b/cheerful-business-man-thumb-up-old-senior-male-suit-right-office-background-174152401.jpg"
                    className='old-guy'
                />
            </div>

        </div>


    </>
}