function render(element, parentNode) {
    if(typeof element == 'string') {
        return parentNode.appendChild(document.createTextNode(element))
    }
    let {type, props} = element
    let domElement = document.createElement(type)
    for(let propName in props) {
        if(propName === 'className') {
            domElement.className = props[propName]
        }else if(propName === 'style') {
            let styleObj = props[propName]
            let cssText = Object.keys(styleObj).map(attr => {
                return `${attr.replace(/([A-Z])/g,function() {return "-" + arguments[1].toLowerCase()})}:${styleObj[attr]}`;
            }).join(';')
            domElement.style.cssText = cssText
        }else if(propName === 'children') {
            let children  = Array.isArray(props.children) ? props.children: [props.children]
            children.forEach(child => {
                render(child, domElement)
            })
        }else {
            domElement.setAttribute(propName, props[propName])
        }
    }
    parentNode.appendChild(domElement)
}

export default {render}