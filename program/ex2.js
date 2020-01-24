window.addEventListener('load', () => {

    let repo = new Report();
    let repoUI = new ReportUI(repo, document.querySelector('#qa_hontai'), 0);
    let page = new Page(["#classes", "#new_report", "#new_konkyo"], '.page');
    let pageUI = new PageUI();
    //let remaid = new remaid(repo);
    repo.set_konkyo(document.querySelector('#kon_hontai'), 0);
    repo.set_sankou( document.querySelector('#san_hontai'), 0 );

    document.querySelector('.savebtn').addEventListener('click', () =>{
        save();
    });
});
class ReportUI {
    /**
     * 描述
     * @date 2019-12-13
     * @param {any} report  Report
     * @param {any} parent  DOMを置いておく要素
     * @param {number} number   レポート番号
     * @returns {any}
     */
    constructor(report, parent, number) {
        this.report = report;
        this.parent = parent;
        this.number = number;
        let nl = new nylon();
        nl.on('page', (key, value) => {
            this.set_qanda();
        })
    }
    /**
     * 描述
     * @date 2019-12-13
     * @param {any} element
     * @param {number} id1  入れ替えるID
     * @param {number} id2  入れ替えるID
     * @returns {any}
     */
    replace_dom(element, id1, id2) {
        console.log(73, id1, id2);
        let new_elm = element.childNodes[id1].cloneNode();
        let old_elm = element.replaceChild(new_elm, element.childNodes[id2]);
        element.replaceChild(old_elm, element.childNodes[id1]);
    }

    /**
     * 描述
     * @date 2019-12-13
     * @param {any} element Q&A情報を追加するDOM要素    ex: document.querySelector('#kon_hontai')
     * @param {number} num  レポート番号    ex: 0
     * @returns {any}
     */

    set_qanda() {
        var report = this.report.report;
        var num = this.number;
        let temp_noup = document.querySelector('#temp1_noup').content;
        let temp_up = document.querySelector('#temp1').content;
        for (let number in report[num]["qanda"]) {
            var temp;
            if (number == 0) temp = temp_noup;
            else temp = temp_up;
            let item = report[num].qanda[number];
            let content = temp.cloneNode(true);
            // 問と答えを入れておく
            content.querySelector('.textQ').value = item.q;
            content.querySelector('.textA').value = item.a;
            content.querySelector('.qa').setAttribute('id', 'qa' + number);
            content.querySelector('.textQ').setAttribute('id','qid' +number);
            content.querySelector('.textA').setAttribute('id','aid' +number);
            console.log('id','aid' +number);


            //移動ボタン
            if (number != 0) {
                content.querySelector('.change').addEventListener('click', (ev1) => {
                    this,this.save_qa();
                    let chid = ev1.srcElement.parentNode.getAttribute('id');
                    let number = chid.slice(2);
                    console.log(96, report[num].qanda[number]);//確認用
                    this.report.replace(report[num].qanda, number, number - 1);
                    while (this.parent.firstChild) this.parent.removeChild(this.parent.firstChild);
                    new nylon().emit('page', { page: '#new_report' })
                    console.log(report[num].qanda[number]);//確認用
                });
            } else {
                console.log(85, content.querySelector('.change'));
                
            }
            // 削除ボタン
            content.querySelector('.delete').addEventListener('click', (ev) => {
                let id = ev.srcElement.parentNode.getAttribute('id');
                let number = id.slice(2);
                report[num].qanda.splice(number, 1);
                ev.srcElement.parentNode.parentNode.removeChild(ev.srcElement.parentNode);
                console.log(number);
            })
            this.parent.appendChild(content);
        }
    }
    save_qa() {
        var report = this.report.report;
        var num = this.number;
        let rep = [];
        let qa_element = document.querySelector('#qa_hontai');
        for (let data of qa_element.querySelectorAll('.qa')) {
            let q_text = data.querySelector('input').value;
            let a_text = data.querySelector('textarea').value;
            rep.push({ q: q_text, a: a_text });
        }
        this.report.report[num].qanda = rep;
        console.log(131, this.report.report[num].qanda);
    }
}

class Report {
    constructor() {
        this.report = [];
        //グローバル変数は　ex2.html にある
        // テストデータの仮代入
        this.report[0] = {};
        this.report[0].qanda = [];
        this.report[0].konkyo = [];
        this.report[0].sankou = [];

        // テストデータの細かい部分を仮代入
        let qa = this.report[0].qanda;
        let k = this.report[0].konkyo;
        let r = this.report[0].sankou;
        qa.push({ q: "問いの記入１", a: "問いに対する答えの入力１" });
        qa.push({ q: "問いの記入２", a: "問いに対する答えの入力２" });
        qa.push({ q: '問いの記入３', a: '問いに対する答えの入力3' });
        k.push({ k: '根拠の記入１' });
        k.push({ k: '根拠の記入２' });
        r.push({ r: '参考文献のURLなどを記入１' });
        r.push({ r: '参考文献のURLなどを記入２' });
    }

     save() {
        document,querySelector('.save').addEventListener('click',() =>{
            var mydata = document.querySelector('.shuchou');
            console.log(これれは)
            localStorage.setItem('mydata',mydata);
        }) 
    }

    set_data() {
        document.querySelector('.save').addEventListener('click', () => {
             localStorage.setItem('reminder', JSON.stringify(qa));
         })

    }
//根拠の表示
    set_konkyo( element, num ) {
        document.querySelector('#b_kon').addEventListener('click', () => {
            let temp = document.querySelector('#temp0').content;
            
            for( let number in this.report[num].konkyo ) {
                let item = this.report[num].konkyo[number];
                let content = temp.cloneNode(true);

                //根拠を入れておく
                content.querySelector('.textK').value = item.k;
                content.querySelector('.kk').setAttribute('id', 'kk' + number );
                content.querySelector('.textK').setAttribute('id','tk' + number);
                console.log( 'id', 'kk' + number );
                console.log('id','tk'+ number);


                //削除ボタン
                content.querySelector('.delete2').addEventListener('click', (ev2) => {
                    let id2 = ev2.srcElement.parentNode.getAttribute('id');
                    let number2 = id2.slice(2);
                    this.report[num].konkyo.splice(number2,1);
                    ev2.srcElement.parentNode.parentNode.removeChild(ev2.srcElement.parentNode);
                })
                element.appendChild( content );
            }
           

        });
    }
//参考文献の表示
    set_sankou(element, num) {
        document.querySelector('#san_start').addEventListener('click', () => {
            let temp = document.querySelector('#temp3').content;

            for (let number in this.report[num].sankou) {
                let item = this.report[num].sankou[number];
                let content = temp.cloneNode(true);

                //根拠を入れておく
                content.querySelector('.textS').value = item.r;
                content.querySelector('.ss').setAttribute('id', 'ss' + number);
                content.querySelector('.textS').setAttribute('id', 'sid' + number);
                console.log('id', 'ss' + number);
                console.log('id', 'sid' + number);


                //削除ボタン
                content.querySelector('.delete3').addEventListener('click', (ev3) => {
                    console.log(ev3.srcElement.parentNode);
                    let id3 = ev3.srcElement.parentNode.getAttribute('id');
                    let number3 = id3.slice(2);
                    this.report[num].sankou.splice(number3, 1);
                    ev3.srcElement.parentNode.parentNode.removeChild(ev3.srcElement.parentNode);
                })
                element.appendChild(content);
            }


        });
    }
    //入れ替え処理(下
    replace(qanda, id1, id2) {
        let change = qanda[id1];
        qanda[id1] = qanda[id2];
        qanda[id2] = change;
    }

}
class PageUI {
    constructor() {
        let nl = new nylon();
        document.querySelector('#b_qanda').addEventListener('click', () => {
            nl.emit("page", { page: '#new_report' });
        });
    }
}

function save() {
    var Jdata = {
        shuchou: document.querySelector('.tex').value,
        ckonkyo: document.querySelector('.chou').value,
        konkyo1: document.querySelector('#tk0').value,
        konkyo2: document.querySelector('#tk1').value,
        q1: document.querySelector('#qid0').value,
        a1: document.querySelector('#aid0').value,
        q1: document.querySelector('#qid1').value,
        a1: document.querySelector('#aid1').value,
        sankou1: document.querySelector('#sid0').value,
        sankou2: document.querySelector('#sid1').value

    };
    localStorage.setItem("savedata", JSON.stringify(Jdata));
    console.log("保存しました");
}