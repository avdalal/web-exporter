import './contentScript.css';

const componentNames = [
    "image-component",
    "rich-text-component"
];

componentNames.forEach(element => {
    const components = document.getElementsByClassName(element);
    Array.from(components).forEach(comp => {
        addComName(comp, element) ;
    });
});

const elementsWithContentExport = document.querySelectorAll('[contentexport]');
const contentExportValues = [];

elementsWithContentExport.forEach(function(element) {
    const attributeValue = element.getAttribute('contentexport');
    contentExportValues.push(attributeValue);
});

contentExportValues.forEach(element => {
    const components = document.querySelectorAll(`[contentexport=${element}]`);

    Array.from(components).forEach(comp => {
        addComName(comp, element) 
    });
});

const addComName = ( comp: Element, element: string) => {
        comp.classList.add("component");
        // Check if a .par-div already exists
        if (!comp.querySelector('.par-div')) {
            const pardiv = document.createElement("div");
            pardiv.className = "par-div";
            const name = document.createElement("span");
            name.innerHTML = `${element}`;
            name.className = "component-name";
            pardiv.prepend(name); 
            comp.prepend(pardiv);
        }
}