const MATCH_LIST = {
  'there': 'their',
  'their': 'there',
  'they\'re': 'there',
  'There': 'Their',
  'Their': 'There',
  'They\'re': 'There',
  'THERE': 'THEIR',
  'THEIR': 'THERE',
  'THEY\'RE': 'THERE'
};

function transformTextNodes(node) {
    if(node.nodeType == Node.TEXT_NODE){
      		let words = node.textContent.split(' ');
        		for(let i=0;i<words.length;i++){
        			words[i] = words[i].replace('\n','')
        			words[i] = words[i].trim()
        			if(MATCH_LIST[words[i]]!== undefined){
                  words[i] = MATCH_LIST[words[i]];
              }
      		    node.textContent = words.join(' ');
    	     }
    }
    for(child of node.childNodes){
        transformTextNodes(child);
    }
}
transformTextNodes(document.body);
