let subsrting1 = "";
let subsrting2 = "";
let alphavitString = "";
let alphavit = [];
let mas = [];
let mas2 = [];
let states = [];
let lenghtTrue = '';

function unique(arr) {
    let result = [];
    for (let str of arr) {
        if (!result.includes(str)) {
            result.push(str);
        }
    }

    return result;
}

let check = (sub) => {
    let result = true;
    sub.forEach(element => {
        if (alphavit.indexOf(element, 0) === -1) result = false;
    });
    return result;
};
let checkSubstrings = (chain) => {
    let result = true;
    if (chain.indexOf(subsrting1, 0) !== 0) result = false;
    if (chain.lastIndexOf(subsrting2) !== chain.length - subsrting2.length) {
        console.log(chain.lastIndexOf(subsrting2));
        console.log(chain.length - subsrting2.length);
        result = false;
    }
    return result;
};

function checkChain(chain) {

    let str = "";
    let copyChain = chain;
    let i = 0;
    let stateIndex = 1;
    let res = $("#resultCheck");
 //   let result = "";
    while (copyChain.length > 0) {
        str += "\""+copyChain+"\"";
        console.log(copyChain);
        let indexChar = mas[0].indexOf(copyChain[i]);
        // str+="\n"+"copyChII"+copyChain[i]+"\n";
        if (indexChar !== -1) {
            if (mas[stateIndex][indexChar] !== 0) {
              //  result += states[stateIndex - 1];
              //   str+="  stateIndex, idnexChar: "+stateIndex+" "+indexChar+" ";
                copyChain = copyChain.substring(1);
                str+=" -> "+copyChain+" ("+mas[0][indexChar]+") "+" q"+(stateIndex-1);
                stateIndex = states.indexOf(mas[stateIndex][indexChar])+1;
                str+=" -> "+"q"+(stateIndex-1)+"\n";
            } else {
                // str+="  1stateIndex, idnexChar: "+stateIndex+" "+indexChar+" ";
                str = str +" для состояния q"+(stateIndex-1)+" нет перехода через \'"+mas[0][indexChar]+"\'";
                break;
            }

        }else{
            str = str + "символа \'"+copyChain[i]+"\' нет в алфавите";
            // str+="  2stateIndex, idnexChar: "+stateIndex+" "+indexChar+" ";
            break;
        }
        //$("#resultCheck").text($("#resultCheck").val() + " " + result);
        str= str + "\n";
    }
    res.text(str);
//    $("#resultCheck").text();
    // return result;



}

function buildTable() {
    // console.log(subsrting1);
    // let copySub1 = subsrting1;
    // while(true){
    //     console.log("while");
    //     if (subsrting2.startsWith(copySub1)){
    //         //subsrting1 = copySub1;
    //         lenghtTrue=subsrting1.slice(0,subsrting1.length - copySub1.length);
    //         break;
    //     }else{
    //         copySub1 = copySub1.substring(1,copySub1.length-1);
    //     }
    //     if(copySub1.length===0) break;
    // }
    // console.log(subsrting1);

    let n = alphavit.length + 1, m = subsrting1.length + 1 + subsrting2.length + 1; //n-столбцы m-строки


    for (let i = 0; i < m; i++) {
        mas[i] = [];
        mas2[i] = [];
        for (let j = 0; j < n; j++) {
            if (i === 0 && j !== 0) {
                mas[i][j] = alphavit[j - 1];
                mas2[i][j] = alphavit[j - 1];
            } else if (j === 0 && i !== 0) {
                mas[i][j] = "q" + (i - 1);
                mas2[i][j] = "q" + (i - 1);
                states.push("q" + (i - 1));
            } else {
                mas[i][j] = 0;
                mas2[i][j] = 0;
            }
            // if(i==j==0)
        }
    }
    mas[0][0] = "qN";
    mas2[0][0] = "qN";
    console.log(mas);
}

let checkToFill = (startWay, char, state) => {
    //let start = subsrting1.length+1;
    let end = states.length;
    let endWay = "";
    for (let i = state; i < end; i++) {
        for (let x = 1; x < mas2[0].length; x++) {
            if (mas2[i][x] !== 0) {
                endWay = endWay + mas2[0][x];
                break;
            }
        }
    }
    let way = startWay + char + endWay;

    let result;
    if (way.substr(way.length - subsrting2.length, subsrting2.length) === subsrting2) {
        result = true;
    } else result = false;

    return result;
};


function fillTable() {
    //  mas2.push(...mas);

    console.log("mas2");
    console.log(mas2);


    let arrSub1 = subsrting1.split("");
    let startState = "q0";
    //console.log(states);
    let y = 0;
    for (let i = 0; i < arrSub1.length; i++) {
        let y = alphavit.indexOf(arrSub1[i]);
        let sos = "q" + (i + 1);
        let x = states.indexOf("q" + i);

        mas[x + 1][y + 1] = sos;
        mas2[x + 1][y + 1] = sos;

    }
    let arrSub2 = subsrting2.split("");
    for (let i = 0; i < arrSub2.length; i++) {
        let y = alphavit.indexOf(arrSub2[i]);
        let sos = "q" + (i + 1 + arrSub1.length);
        let x = states.indexOf("q" + (i + arrSub1.length));
        mas[x + 1][y + 1] = sos;
        mas2[x + 1][y + 1] = sos;
    }

    let start = subsrting1.length + 1;
    let twins = 0;
    let ch = "";
    let end = states.length + 1;


    let copySub = subsrting1.split("");
    while (true) {
        let newStart = 1;
        let plusOne = 1;
        console.log("while");
        if (subsrting2.startsWith(copySub.join(''))) {
            let copySub1 = copySub.join('');
            twins = copySub1.length;
            ch = subsrting2[copySub1.length];
            console.log("ch:");
            console.log(ch);

            if (ch === undefined) {
                // ch = end;
                ch = subsrting2[copySub1.length - 1];
                newStart = 1;
                plusOne = 0;
            }
            if (ch === subsrting2[copySub1.length - 1]) {
                plusOne = 0;
            }
            console.log("TUT1");
            // цепочка abс cd  не прошла
            let sim = mas[0].indexOf(ch);
            // if (newStart === 1) {
            //     console.log("TUT2");
            //     mas[twins + 1][sim] = 'q' + (start + twins - newStart);
            //     mas2[twins + 1][sim] = 'q' + (start + twins - newStart);
            // } else {
            //     console.log("TUT3");
            //     mas[twins + 2][sim] = 'q' + (start + twins - newStart);
            //     mas2[twins + 2][sim] = 'q' + (start + twins - newStart);
            // }
            console.log("sim = ");
            console.log(sim);

            console.log(mas[twins + newStart + subsrting1.length][0]);
            mas[subsrting1.length][sim - plusOne] = mas[twins + newStart + subsrting1.length][0];
            mas2[subsrting1.length][sim - plusOne] = mas2[twins + newStart + subsrting1.length][0];

            break;
        } else {
            copySub.splice(0, 1);
            //copySub1 = copySub1.substring(1,copySub1.length-1);
        }
        if (copySub.length === 0) break;
    }
    console.log("ch:");
    console.log(ch);

    let chars = subsrting1;

    for (let i = start; i < end; i++) {

        for (let IndexChar = 0; IndexChar < alphavit.length; IndexChar++) {
            console.log(i);
            if (mas2[i][IndexChar + 1] === 0) {


                for (let j = i; j >= start; j--) {
                    console.log(chars, mas[0][IndexChar + 1], j);
                    console.log("");

                    console.log("result: ", checkToFill(chars, mas[0][IndexChar + 1], j));
                    console.log("");
                    if (checkToFill(chars, mas2[0][IndexChar + 1], j)) {
                        mas[i][IndexChar + 1] = mas2[j][0];
                        break;
                    }
                    //сохранить буквы до + текущую + что будет дальше
                }
            }


        }


        for (let x = 1; x < mas2[i].length; x++) {
            if (mas2[i][x] !== 0) {
                chars = chars + mas2[0][x];
                break;
            }
        }

    }


    console.log(mas);
    // let arrChain
//заполнение таблицы

}


$(document).ready(() => {
    let inputAlpha = $("#alphabet");
    let sub1 = $("#substring1");
    let sub2 = $("#substring2");
    let subs = $("#substrings");
    let chains = $("#chains");

    chains.css("display", "none");
    subs.css("display", "none");


    inputAlpha.on('keyup', () => {
        if (inputAlpha.val() != "") {
            inputAlpha.css("border", "");
        } else inputAlpha.css("border", "1px solid red");
    });


    $("#openSubs").click(() => {
        if (inputAlpha.val() !== "") {
            let alphavit1 = [];
            alphavit1.push(...(inputAlpha.val().split(",")));
            alphavit = unique(alphavit1);
            if(alphavit.indexOf(" ")!==-1){
                alert("Алфавит не дожен содержать пробелы");
                return;
            }else{
                subs.css("display", "block");
                $("#alpha").css("display", "none");
            }
            $("#sub1help").css("display", "none");
            $("#sub2help").css("display", "none");
            // alphavitString = alphavit.join();
            console.log(alphavit);
        }
    });

    $("#start").click(() => {
        subsrting1 = sub1.val();
        subsrting2 = sub2.val();
        let sub1check = check(subsrting1.split(''));
        let sub2check = check(subsrting2.split(''));

        if (!sub1check) {
            $("#sub1help").css("display", "block");
        } else $("#sub1help").css("display", "none");
        if (!sub2check) {
            $("#sub2help").css("display", "block");
        } else $("#sub2help").css("display", "none");
        if (sub1check && sub2check) {
            subs.css("display", "none");
            chains.css("display", "block");

            buildTable();
            fillTable();
            let g = new Graph();
            for (let i = 0; i < states.length; i++) {
                g.addNode(states[i], {label: states[i], fill: "#fff"})
            }

            for (let i = 1; i < mas.length; i++) {
                let target = [];
                let what = [];
                for (let j = 1; j < mas[0].length; j++) {
                    //if(target.length>0)
                    let x = target.indexOf(mas[i][j]);
                    if (x !== -1) {
                        what[x] = what[x] + "," + mas[0][j];
                    } else {
                        target.push(mas[i][j]);
                        what.push(mas[0][j]);
                    }
                }
                // console.log(target);
                // console.log(what);
                for (let x = 0; x < target.length; x++) {
                    if (target[x] !== 0) {

                        g.addEdge(mas[i][0], target[x], {directed: true, label: what[x]});
                        console.log(mas[i][0], target[x], what[x]);
                    }
                }


            }
            // g.addNode("bebebe", { label: "q0" });
            /*
            for(var i = 1; i <= 13; i++) {
             // метод addEdge(a, b) создает ребро между узлами а и b
             // если узлы a и b еще не созданы, они создадутся автоматически
             g.addEdge(i, (i + 3) % 5 + 1);
             var j = (i + 7) % 5 + 1;

             // можно указать дополнительные свойства ребра
             g.addEdge(i, j, {
               directed: true, // ориентированное ребро
               stroke: "#fff", fill: "#5a5", // цвета ребра
               label: i+":"+j } ); // надпись над ребром
            }*/
            /*   g.addNode("lalala", { label: "q1" });
               g.addEdge("bebebe","bebebe",{
                   directed: false,
                   label:"a,b,c"
               });
               g.addEdge("bebebe","lalala",{
                   directed: true,
                   stroke: "#fff",
                   fill: "#5a5",
                   label: "d"
               });*/

            // вычисляем расположение вершин перед выводом
            var layouter = new Graph.Layout.Spring(g);
            layouter.layout();

            // выводим граф
            var renderer = new Graph.Renderer.Raphael('canvas', g, 1000, 500);
            renderer.draw();

        }
    });


    $("#drow").click(() => {
      //  mas = [];
        $("#resultCheck").text("");
        let chains = $("#textChains");
        let chainsArray = chains.val().split("\n");
       /* let uncurrectChains = "";
        let unCurChainSub = "";
        for (let i = 0; i < chainsArray.length; i++) {
            // console.log(i);
            if (!check(chainsArray[i].split(""))) {
                uncurrectChains += (i + 1) + ",";
            }
            if (!checkSubstrings(chainsArray[i])) {
                unCurChainSub += (i + 1) + ",";
            }
        }*/

        /*   if (uncurrectChains !== "" || unCurChainSub !== "") {
               //console.log("Не подходящие к алфавиту цепочки под номерами: "+uncurrectChains);
               $("#sub1Chains").text("Не подходящие к алфавиту цепочки под номерами: " + uncurrectChains + "\n Не подходящие по условию подстрок: " + unCurChainSub);
           } else {*/

        if(chainsArray[0]==="" || chainsArray[0]===" "|| chainsArray[0]==="  ") alert("Введите цепочку!");
        else checkChain(chainsArray[0]);

        //строим дка и граф

        //   }


    });


});
