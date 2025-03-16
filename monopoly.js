//拖曳旗子 
const draggableItems = document.querySelectorAll('.token');

draggableItems.forEach(item => {
    item.addEventListener("dragstart", (event) => {
        // 設置被拖動項目的 ID
        event.dataTransfer.setData("text/plain", event.target.id);
    });
});

const dragZones = document.querySelectorAll(".square");

dragZones.forEach(zone =>{zone.addEventListener("dragover", (event) => {
    event.preventDefault(); // 允許放下
    });
})

dragZones.forEach(zone =>{zone.addEventListener("drop", (event) => {
    event.preventDefault(); // 防止默認行為

    // 獲取被拖動項目的 ID
    const draggedItemId = event.dataTransfer.getData("text/plain");
    const draggedItem = document.getElementById(draggedItemId);

    // 將被拖動的項目添加到拖放區域
    event.target.appendChild(draggedItem);
    });
})


// 擲骰變數
const token1 = document.getElementById("token1")
const token2 = document.getElementById("token2")
const token3 = document.getElementById("token3")
let moving = false;
let selectedToken;
selectToken(token1);//預設token1開始


//輸入骰子call行走
document.getElementById('numInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && moving === false) {
        let number = this.value;
        if (1 <= number && number<= 6) {
            index = number; // 將數字賦值給 index
            moving = true;
            movePieceToNextSquare(index);
            this.value = null;
        } else {
            alert("Valid number Please");
        }
    }
});
    

// 點擊獲得移動權權
// token1.addEventListener("click", () => selectToken(token1));
// token2.addEventListener("click", () => selectToken(token2));
// token3.addEventListener("click", () => selectToken(token3));

//獲得移動權
function selectToken(token) {
    if (selectedToken) {
        selectedToken.classList.remove('highlight');
    }

    // 設置新的選擇的 token
    selectedToken = token;
    selectedToken.classList.add('highlight');
}

// 移動換骰
function movePieceToNextSquare(index) {
    
    const childElement = selectedToken;
    const parentElement = childElement.parentElement;
    const parentId = parentElement.id;
    const parentNumber = parseInt(parentId.replace('square', ''));
    
    for(let i = 1 ; i <= index ; i++){
        setTimeout(()=>{
            const newIndex = (parentNumber + i - 1) % 36 + 1; 
            const targetParentId = `square${newIndex}`;
            const targetParentElement = document.getElementById(targetParentId);
            // 如果目標父元素存在，則將子元素移動到目標父元素
            if (targetParentElement) {
            // 將棋子移動到目標父元素
                targetParentElement.appendChild(childElement);
            } else {
                console.log('目標父元素不存在');
            }
            if(i == index){
                
                if(selectedToken === token1){
                    selectToken(token2);
                }else if(selectedToken === token2){
                    selectToken(token3);
                }else if(selectedToken === token3){
                    selectToken(token1);
                }
                moving = false;
                
            }
        },200*i);
    }
}
       