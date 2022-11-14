const url = `https://api.thecatapi.com/v1/images/search?limit=20`;
const api_key = "live_ yo8kXjhew5KTN4EteEhzdzH7oR8SQU LO7eofVyEY1aXNQSAQFyX7gm0CYkF7 zia5"

 fetch(url,{headers: {
      'x-api-key': api_key
    }})
 .then((response) => {
   return response.json();
 })
.then((data) => {
  let imagesData = data;
  imagesData.map(function(imageData) {
    
    let image = document.createElement('img');

    image.src = `${imageData.url}`;
        
    let gridCell = document.createElement('div');
    gridCell.classList.add('col');
    gridCell.classList.add('col-lg');
    gridCell.appendChild(image)
      
    document.getElementById('grid').appendChild(gridCell);
    
    });
})
.catch(function(error) {
   console.log(error);
});