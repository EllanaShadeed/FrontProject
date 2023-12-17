                import { useLocation } from 'react-router-dom';// useLocation to git current page

                const DisplayMaintinanceFile = () => {
                    const BASE_URL = process.env.REACT_APP_BASE_URL;// I declare the base url in .env file and use it in all pages
                    const fileName = useLocation();
                    const FileName = fileName.pathname.split('/')[3];
                    
// this function to display file 
                    const request = new Request(`${BASE_URL}files/pdfs/${FileName}`,
                        {
                            method: "GET",
                            headers: {
                                'Content-Type': 'application/json',
                                Accept: 'application/json',
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            },


                            mode: "cors",
                            cache: "default",
                        }
                    );
// blob object is group of bytes thate holds the data stored in file
                    fetch(request)
                        .then((response) => response.blob())// to take blob out of response after excute api use blob function 
                        .then((blob) => {
                            console.log(blob);
                            const file = window.URL.createObjectURL(blob);//  method creates a string containing a URL representing the object given in the parameter.
                            const iframe = document.querySelector("iframe");// document object represents your web page if i  want to access any element in web page use document object
                            // querySelector return the first element in the document that matches the specified selector
                            if (iframe?.src) iframe.src = file;
                        })


                    return (

                        <div>
                            <iframe title="file" src="" width="100%" height="800px" />
                        </div>


                    );
                }

                export default DisplayMaintinanceFile;