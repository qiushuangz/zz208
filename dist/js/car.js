////88
class Cart {
    constructor() {
        if (localStorage.getItem("cartDatas")) {
            this.cartDatas = JSON.parse(localStorage.getItem("cartDatas"));
        } else {
            this.cartDatas = {};
        }
    }
    add(id, num, bool) {
        //id 商品id
        if (!this.cartDatas[id] || bool) {
            this.cartDatas[id] = num;
        } else {
            this.cartDatas[id] += num;
        }
        //每次添加完成之后要立即存到localStorage
        localStorage.setItem("cartDatas", JSON.stringify(this.cartDatas));
    }
    showList(list) {
        let cartul = document.getElementById(list);
        let datas = JSON.parse(localStorage.getItem("datas"));
        let cartDatas = JSON.parse(localStorage.getItem("cartDatas"));
        let str = "";
        for (let id in this.cartDatas) {
            str += `
            <li data_id ="${datas[id].id}" class="list">
                <input type = "checkbox" class="ck">
                <img src = ${datas[id].imgsrc}>
                <p>${datas[id].name}</p>
                <p class="price">${datas[id].price}</p>
                <div class = "num">
                    <p class="mins">-</p>
                    <input type = "text" value = "${cartDatas[id]}" class=shopnum>
                    <p class="adds">+</p>           
                </div>
                <div class = "much"> ${datas[id].price * cartDatas[id]} </div>
                <span class ="delBtn"> 删除 </span>
            </li>
            `
        }
        cartul.innerHTML = str;
        var ckall = document.getElementById("checkall");
        this.ack = document.getElementsByClassName("ck");
        this.alist = document.getElementsByClassName("list");
        // this.alist = document.querySelectorAll(".list");

        // this.alist = cartul.children;

        this.shopnum = document.getElementsByClassName("shopnum");
        this.mins = document.getElementsByClassName("mins");
        this.adds = document.getElementsByClassName("adds");
        this.much = document.getElementsByClassName("much");
        this.price = document.getElementsByClassName("price");
        this.allprice = document.getElementsByClassName("shopall");
        this.delbtn = document.getElementsByClassName("delBtn");
        console.log(this.alist);
        // this.cartul = document.getElementById("cartul");






        // console.log(this.mins, this.adds, this.shopnum[2].value)
        //1.1 点击全选复选框，让单个复选框全部选中
        ckall.onclick = () => {
            for (let i = 0; i < this.ack.length; i++) {
                this.ack[i].checked = ckall.checked;
            }
            this.getallprice()

        }
        //1.2 点击任意复选框，取消全选
        for (let i = 0; i < this.ack.length; i++) {
            this.ack[i].onclick = () => {
                let conn = 0;
                for (let j = 0; j < this.ack.length; j++) {
                    if (this.ack[j].checked) {
                        conn++
                    }
                }
                if (conn == this.ack.length) {
                    ckall.checked = true;
                } else {
                    ckall.checked = false;
                }
                this.getallprice()
            }
        }
        //1.3 加减数量 

        for (let i = 0; i < this.mins.length; i++) {
            //减数量
            this.mins[i].onclick = () => {
                this.shopnum[i].value--;
                if (this.shopnum[i].value <= 0) {
                    this.shopnum[i].value = 1;
                }
                let id = this.alist[i].getAttribute("data_id")
                this.add(id, +this.shopnum[i].value, true)
                this.much[i].innerText = this.shopnum[i].value * this.price[i].innerText;
                this.getallprice()
            }
            //加数量
            this.adds[i].onclick = () => {
                this.shopnum[i].value++;
                let id = this.alist[i].getAttribute("data_id")
                this.add(id, +this.shopnum[i].value, true)
                this.much[i].innerText = this.shopnum[i].value * this.price[i].innerText;
                this.getallprice()

            }
            //改数量
            this.shopnum[i].onchange = () => {
                let id = this.alist[i].getAttribute("data_id")
                if (this.shopnum[i].value <= 0) {
                    this.shopnum[i].value = 1;
                }
                this.add(id, +this.shopnum[i].value, true)
                this.much[i].innerText = this.shopnum[i].value * this.price[i].innerText;
                this.getallprice()

            }
            //删除商品
            // this.delbtn[i].onclick = () => {
            //     let id = this.alist[i].getAttribute("data_id")
            //     this.delshop(id, i);
            // }
            this.delbtn[i].onclick = () => {

                this.delbtn[i].onclick = () => {
                    let id = this.alist[i].getAttribute("data_id")
                    this.delshop(id, i);
                }

            }
        }
        // 删除商品
        // for (let i = 0; i < this.alist.length; i++) {
        //     this.delbtn[i].onclick = () => {
        //         let id = this.alist[i].getAttribute("data_id")
        //         this.delshop(id, i);
        //     }
        // }



    }
    //得到总价
    getallprice() {
        let sum = 0;

        for (let i = 0; i < this.ack.length; i++) {
            if (this.ack[i].checked) {
                sum += +this.much[i].innerText
            }
        }
        this.allprice[0].innerText = sum;
    }
    //删除
    delshop(id, i) {
        console.log(this.alist)
        // this.alist = document.querySelectorAll(".list");

        //删除数据
        delete this.cartDatas[id];
        localStorage.setItem("cartDatas", JSON.stringify(this.cartDatas));
        //删除结构
        // cartul.removeChild(this.delbtn[i].parentNode)
        cartul.removeChild(this.alist[i])

        this.ack[i].checked = false;
        //既然没有发生改变，在getTotalPrice里计算总价时，还会算上。怎么算的呢？看单个复选框是否选中。所有既然删了，不要取计算删除的商品的价格，就把当前删除的商品前的复选框置为false，就不会再计算了
        this.getallprice();
        console.log(this.alist)
    }

}