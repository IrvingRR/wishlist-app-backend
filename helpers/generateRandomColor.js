const generateRandomColor = () => {

    let red = Math.floor(Math.random() * 255);
    let green = Math.floor(Math.random() * 255);
    let blue = Math.floor(Math.random() * 255);
    let alpha = Math.floor(Math.random() * 9);

    const generatedColor = `rgba(${red}, ${green}, ${blue}, 0.${alpha})`;
    
    return generatedColor;

};

module.exports = { generateRandomColor };