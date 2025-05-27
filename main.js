const form = document.querySelector(".shape-form");
const resultsList = document.querySelector('.results-list');

    
form.addEventListener('submit', onSubmit);

function onSubmit(event){
      event.preventDefault();
      const inputText = form['main-input'].value.trim();
      resultsList.innerHTML = ' ';

      if (!inputText) {
            resultsList.innerHTML = '<li>Please enter some shapes data.</li>';;
            return;
        }

        try {
        const results = processShape(inputText);
        results.forEach(result => {
            const li = document.createElement('li');
            li.textContent = result;
            li.classList.add('result-item');
            resultsList.appendChild(li);
        });
    } catch (error) {
        const li = document.createElement('li');
        li.textContent = `Error: ${error.message}`;
        li.classList.add('error-message');
        resultsList.appendChild(li);
    }
}

function printResult (shape){
    return `${shape.type} | Perimeter: ${Math.round(shape.getPerimeter())} Area: ${Math.round(shape.getArea())}`;
}

function createSquare(topRightX, topRightY, side){

    return {
        type: 'Square',
        topRight: {x: topRightX, y: topRightY},
        getArea: () => side * side,
        getPerimeter: () => 4 * side,
        toString: function(){
            return printResult(this);
        }
    }
}

// const square1 = createSquare(1, 1, 1);
// console.log(square1.toString()); // console output

function createRectangle(topRightX, topRightY, bottomLeftX, bottomLeftY){
    const width = Math.abs(topRightX - bottomLeftX);
    const height = Math.abs(topRightY - bottomLeftY);

    return {
        type: 'Rectangle',
        topRight: {x: topRightX, y: topRightY},
        bottomLeft: {x: bottomLeftX, y: bottomLeftY},
        getArea: () => width * height,
        getPerimeter: () => 2 * (width + height),
        toString: function(){
            return printResult(this);
        }
    }
}

// const square2 = createRectangle(2, 2, 1, 1);
// console.log(square2.toString()); // console output

function createCircle(centerX, centerY, radius){
    return {
        type: 'Circle',
        circle: {x: centerX, y: centerY},
        getArea: () => radius,
        getPerimeter: () => radius / 2,
        toString: function(){
            return printResult(this);
        }
    }
}

// const square3 = createCircle(1, 1, 2);
// console.log(square3.toString()); // console output

function createTriangle(x1, y1, x2, y2, x3, y3){
function getDistance(xa, ya, xb, yb) {
        return Math.sqrt(Math.pow(xb - xa, 2) + Math.pow(yb - ya, 2));
    }
    const side1 = getDistance(x1, y1, x2, y2);
    const side2 = getDistance(x2, y2, x3, y3);
    const side3 = getDistance(x3, y3, x1, y1);

    const perimeter = side1 + side2 + side3;
    const area = Math.abs((x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2))/2);

    return {
        type: 'Triangle',
        getArea: () => area,
        getPerimeter: () => perimeter,
        toString: function(){
            return printResult(this);
        }
    }
}

// const square4 = createTriangle(5, 5, 8, 8, 10, 2);
// console.log(square4.toString()); // console output

function parseShape(line){
     const parts = line.trim().split(/\s+/);
    if (parts.length === 0) return null;

     const shapeType = parts[0].toLowerCase();
     const args = parts.slice(1);

     try {
        switch (shapeType){
            case 'square':
                if (args.length !== 5 || args[0].toLowerCase() !== 'topright' || args[3].toLowerCase() !== 'side') {
                    throw new Error('Invalid square format. Expected: Square TopRight x y Side length');
                }
                const topRightX =  parseFloat(args[1]);
                const topRightY =  parseFloat(args[2]);
                const side = parseFloat(args[4]);
                return createSquare(topRightX, topRightY, side);

            case 'rectangle':
                if (args.length !== 6 || args[0].toLowerCase() !== 'topright' || args[3].toLowerCase() !== 'bottomleft') {
                    throw new Error('Invalid rectangle format. Expected: Rectangle TopRight x1 y1 BottomLeft x2 y2');
                }
                return createRectangle(
                    parseFloat(args[1]),
                    parseFloat(args[2]),
                    parseFloat(args[4]),
                    parseFloat(args[5]),
                );

                case 'circle':
                    if (args.length !== 5 || args[0].toLowerCase() !== 'center' || args[3].toLowerCase() !== 'radius') {
                        throw new Error('Invalid circle format. Expected: Circle Center x y Radius r');
                      }
                    return createCircle(
                        parseFloat(args[1]),
                        parseFloat(args[2]),
                        parseFloat(args[4])
                );

                case 'triangle':
                    if (args.length !== 9 || args[0].toLowerCase() !== 'point1' || args[3].toLowerCase() !== 'point2' || args[6].toLowerCase() !== 'point3') {
                         throw new Error('Invalid triangle format. Expected: Triangle Point1 x1 y1 Point2 x2 y2 Point3 x3 y3');
                      }
                    return createTriangle(
                        parseFloat(args[1]),
                        parseFloat(args[2]),
                        parseFloat(args[4]),
                        parseFloat(args[5]),
                        parseFloat(args[7]),
                        parseFloat(args[8]),
                    )

                default:
                throw new Error(`Unknown shape type: ${shapeType}`)
        }  
     } catch (error) {
        throw new Error(`Error parsing ${shapeType}: ${error.message}`);
     }
}

function processShape(inputText){
    const lines = inputText.split('\n').filter(line => line.trim())
    const results = [];
    for (const line of lines) {
       try {
         const shape = parseShape(line);
         if(shape) {
            results.push(shape.toString());
         }
       } catch (error) {
        results.push(`Error: ${error.message}`);
       } 
    }
    return results;
}


