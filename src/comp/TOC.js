import React, {Component} from 'react';
import '../App.css';

class TOC extends Component {
    render() {
        var data = this.props.data;
        var lists = [];
        var i = 0;
        while(i < data.length) {
            lists.push(
                <li key={data[i].id}>
                    <a href={"/content/"+data[i].id+".html"}
                        data-아이디 = {data[i].id} // 1. target.dataset속성을 이용하여 전달하는 방법
                        onClick={function(_id, e){   // <<ㅡㅡㅡㅡㅡㅡㅡㅡㅡㄱ
                            e.preventDefault();             //              |
                            this.props.onChangePage(_id);   //              |
                        }.bind(this, data[i].id)}  // 2. function의 인자로 bind하는 방법
                    >
                    {data[i].title}
                    </a>
                </li>
            );
            i = i+1;
        }
      return (
          <nav>
            <ul>
              {lists}
            </ul>
          </nav>
      );
    }
  }

export default TOC;