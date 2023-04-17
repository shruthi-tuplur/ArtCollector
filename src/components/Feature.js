import React, { Fragment } from 'react';

// Don't touch this import
import { fetchQueryResultsFromTermAndValue } from '../api';

/**
 * We need a new component called Searchable which:
 * 
 * Has a template like this:
 * 
 * <span className="content">
 *  <a href="#" onClick={async (event) => {}}>SOME SEARCH TERM</a>
 * </span>
 *
 * You'll need to read searchTerm, searchValue, setIsLoading, and setSearchResults off of the props.
 * 
 * When someone clicks the anchor tag, you should:
 * 
 * - preventDefault on the event
 * - call setIsLoading, set it to true
 * 
 * Then start a try/catch/finally block:
 * 
 * try:
 *  - await the result of fetchQueryResultsFromTermAndValue, passing in searchTerm and searchValue
 *  - send the result to setSearchResults (which will update the Preview component)
 * catch: 
 *  - console.error the error
 * finally:
 *  - call setIsLoading, set it to false
 */
const Searchable = (props) => {
    const {searchTerm, searchValue, setIsLoading, setSearchResults} = props;
    return(
        <li className="content">
            <a href="#" onClick={async (event) => {
                event.preventDefault();
                setIsLoading(true);

                try{
                    let result = await fetchQueryResultsFromTermAndValue(searchTerm, searchValue);
                    setSearchResults(result);

                } catch(error){
                    console.error(error);
                } finally {
                    setIsLoading(false);
                }
            }}>{searchTerm.charAt(0).toUpperCase()}{searchTerm.substring(1)}: {searchValue}</a>
        </li >
    )
  
}

/**
 * We need a new component called Feature which looks like this when no featuredResult is passed in as a prop:
 * 
 * <main id="feature"></main>
 * 
 * And like this when one is:
 * 
 * <main id="feature">
 *   <div className="object-feature">
 *     <header>
 *       <h3>OBJECT TITLE</h3>
 *       <h4>WHEN IT IS DATED</h4>
 *     </header>
 *     <section className="facts">
 *       <span className="title">FACT NAME</span>
 *       <span className="content">FACT VALUE</span>
 *       <span className="title">NEXT FACT NAME</span>
 *       <span className="content">NEXT FACT VALUE</span>
 *     </section>
 *     <section className="photos">
 *       <img src=IMAGE_URL alt=SOMETHING_WORTHWHILE />
 *     </section>
 *   </div>
 * </main>
 * 
 * The different facts look like this: title, dated, images, primaryimageurl, description, culture, style, 
 * technique, medium, dimensions, people, department, division, contact, creditline
 * 
 * The <Searchable /> ones are: culture, technique, medium (first toLowerCase it), and person.displayname (one for each PEOPLE)
 * 
 * NOTE: people and images are likely to be arrays, and will need to be mapped over if they exist
 * 
 * This component should be exported as default.
 */
const Feature = (props) => {
    const {featuredResult, setIsLoading, setSearchResults} = props;
    if(!featuredResult){
        return null
    } 
    
    const {title, dated, images, primaryimageurl, description, culture, style, technique, medium, dimensions, people, department, division, contact, creditline} = featuredResult;
    return(
        <main id="feature">
            <header id='feature-header'>
               <h3>{title}</h3>
               <h4>{dated}</h4>
             </header>
          <div className="object-feature"> 
            <div className='feature-layout'>             
            <div id='facts-div'>
                <section className="facts">
                    <ul>
                        {title && <li  className="title">Title: {title}</li >}
                        {culture && <Searchable searchTerm = 'culture' searchValue = {culture} setIsLoading={setIsLoading} setSearchResults={setSearchResults}/>}
                        {technique && <Searchable searchTerm = 'technique' searchValue = {technique} setIsLoading={setIsLoading} setSearchResults={setSearchResults}/>}
                        {medium && <Searchable searchTerm = {medium.toLowerCase()} searchValue = {medium.toLowerCase()} setIsLoading={setIsLoading} setSearchResults={setSearchResults}/>}
                        {people && people.map(person => {<Searchable searchTerm = 'displayname' searchValue = {person.displayname} setIsLoading={setIsLoading} setSearchResults={setSearchResults}/>})}
                        {dated && <li  className="dated">Datee: {dated}</li>}
                        {description && <li className="description">Description: {description}</li>}
                        {dimensions && <li  className="dimensions">Dimensions: {dimensions}</li>}
                        {department && <li  className="department">Department: {department}</li >}
                        {division && <li  className="division">Division: {division}</li >}
                        {contact && <li  className="contact">Contact: {contact}</li >}
                        {creditline && <li  className="creditline">Credit: {creditline}</li >}
               
                    </ul>
                 </section>
                 </div>
                 <div id='photo-div'>
                 <section className="photos">
                    {images && images.map((image) => {
                        return <img key = {image.imageid} className='featured-photo' src={image.baseimageurl} alt='SOMETHING_WORTHWHILE' />
                    })}
                    
                </section>
                </div>
                 </div>  
                 
             </div>
            
           
        </main>
    )
}

export default Feature;