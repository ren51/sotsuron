const pages = ["#classes", "#new_report"];/*ここで移動する変数の宣言*/




/* ボタンを押されたときの処理*/
class Page {
  /**
   * 描述
   * @date 2019-12-13
   * @param {Array} elms  ページ切り替えを行うIDの配列    ex: ["#classes", "#new_report"]
   * @param {string} cls   切り替えを行うページのクラス  ex: '.page'
   * @returns {any}
   */
  constructor(elms, cls) {
    this.elms = elms;
    this.cls = cls;

    let nl = new nylon();
    nl.on(' page', ( key, value ) => {
      this.change( value.page );
    });
  }
  /*change を宣言　＝＞　ボタンなどを押された後の処理 */
  /**
   * 描述
   * @date 2019-12-13
   * @param {string} page 切り替えるID  ex: '#classes'
   * @returns {any}
   */
  change( page ) {
    if (this.elms.includes(page)) {
      let pages1 = document.querySelectorAll(this.cls);　/*クラスを指定する　（.pageはクラス名） */
      for (p of pages1) {
        p.style.display = "none";
      }
      console.log(page);
      document.querySelector(page).style.display = "block";
    } else {
      throw "ページがありません";
    }
  }
}
