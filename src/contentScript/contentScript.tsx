import './contentScript.css';

const componentNames = [
    "image-component",
    "rich-text-component"
];

const addComName = ( comp: Element, element: string, type: string) => {
    if(type == "parent") {
        comp.classList.add("component");
    } 
    if(type === "child") {
        comp.classList.add("child-component");
    }
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

componentNames.forEach(element => {
    const components = document.getElementsByClassName(element);
    Array.from(components).forEach(comp => {
        addComName(comp, element, "parent") ;
    });
});

const elementsWithContentExport = document.querySelectorAll('[contentexport]');
const contentExportValues = [];
const childelementsWithContentExport = document.querySelectorAll('[contentexportchild]');
const childcontentExportValues = [];

elementsWithContentExport.forEach(function(element) {
    const attributeValue = element.getAttribute('contentexport');
    contentExportValues.push(attributeValue);
});

childelementsWithContentExport.forEach(function(element) {
    const attributeValue = element.getAttribute('contentexportchild');
    childcontentExportValues.push(attributeValue);
});

contentExportValues.forEach(element => {
    const components = document.querySelectorAll(`[contentexport=${element}]`);

    Array.from(components).forEach(comp => {
        if (element == "mainText") {
            // const htmlContent = comp.innerHTML;
            // let modifiedContent = htmlContent.replace(/<h2 /gi, "[SPLIT]<h2 ").replace(/<\/h2>/gi, "</h2>[SPLIT]");
            // const sections = modifiedContent.split("[SPLIT]");
           // console.log(sections);
        }
        addComName(comp, element, "parent");
    });
});
childcontentExportValues.forEach(element => {
    const components = document.querySelectorAll(`[contentexportchild=${element}]`);

    Array.from(components).forEach(comp => {
        addComName(comp, element, "child");
    });
});



