'use strict';

const e = React.createElement;
const urlServ = "http://51.83.99.197:5002"

function delDev(e, i, p) {
    console.log(e, i, "index");

    e.preventDefault()
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", urlServ + "/del_dev?index=" + String(i) + "&password=" + p, false); // false for synchronous request
    xmlHttp.send(null);
    return true

}

function Devoir(props) {
    console.log(props.index);
    return (
        <div key={props.index} className="Devoir">
            <p> <strong>Date de fin: {props.date}</strong> </p>
            <p><strong>Matiere :</strong> {props.matiere}</p>
            <p><strong>Titre :</strong>  {props.text}</p>
            <a href={props.lien}>Lien</a>
            <button class="supp" onClick={(e) => { delDev(e, props.index, props.password); props.refresh() }}>Supprimer</button>
        </div>
    )
}


class FormNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: "",
            matiere: "",
            titre: "",
            lien: "",

        };

        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeMatiere = this.handleChangeMatiere.bind(this);
        this.handleChangeTitre = this.handleChangeTitre.bind(this);
        this.handleChangeLien = this.handleChangeLien.bind(this);
        this.handleChangeSubmit = this.handleChangeSubmit.bind(this);
    }



    sendData() {
        var data = this.state
        data.password = this.props.password
        var xhr = new XMLHttpRequest();
        xhr.open("POST", urlServ + "/new_dev", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
    }


    handleChangeDate(e) {
        this.setState({ date: e.target.value });
    }
    handleChangeTitre(e) {
        this.setState({ titre: e.target.value });
    }
    handleChangeMatiere(e) {
        this.setState({ matiere: e.target.value });
    }
    handleChangeLien(e) {
        this.setState({ lien: e.target.value });
    }
    handleChangeSubmit(e) {
        e.preventDefault()
        this.sendData()
        console.log(this.state);
        setTimeout(() => this.props.refresh(), 500)
    }

    render() {
        return (
            <div className="addnewevent">
                <h2>Ajouter une matière</h2>
                <label>
                    Date:
                    <input type="date" value={this.state.date} onChange={this.handleChangeDate} />
                </label>
                <br />
                <label>
                    Matère:
                    <input value={this.state.matiere} onChange={this.handleChangeMatiere} />
                </label>
                <br />

                <label>
                    Titre:
                    <input value={this.state.titre} onChange={this.handleChangeTitre} />
                </label>
                <br />
                <label>
                    Lien:
                    <input value={this.state.lien} onChange={this.handleChangeLien} />
                </label>
                <br />

                <button onClick={this.handleChangeSubmit} >Valider</button>
            </div>

        );
    }
}



class InputPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",

        };
        this.handleChangeSubmit = this.handleChangeSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChangeSubmit(e) {
        this.props.onSubmit(this.state.password)
    }

    handleChange(e) {
        this.setState({ password: e.target.value });
    }
    render() {

        return (
            <div class="mdp">
                <h2>Valider le mdp admin</h2>
                <input value={this.state.password} onChange={this.handleChange} />
                <button onClick={this.handleChangeSubmit} >Valider</button>
            </div>

        )
    }

}



class ListeDevoirs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            password: ""
        };

        this.defRefresh = this.defRefresh.bind(this);
        this.handlePassword = this.handlePassword.bind(this);

    }

    handlePassword(val) {
        this.setState({ password: val });
    }


    componentDidMount() {
        console.log("default");
        fetch(urlServ + "/get_devs")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },

                (error) => {
                    console.log(error, "ssss");
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    defRefresh() {
        fetch(urlServ + "/get_devs")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },

                (error) => {
                    console.log(error, "ssss");
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }



    render() {
        console.log(this.state.items);
        console.log(this.state.items != []);
        return (
            <div>
                <div id="List">
                    {this.state.isLoaded && this.state.items != [null] ?
                        this.state.items.map((x) => <Devoir refresh={this.defRefresh} index={x.index} password={this.state.password} key={x.index} date={String(x.date)} matiere={x.matiere} text={x.titre} lien={x.lien} />)
                        : "Loading"}
                </div>
                <section>
                <InputPassword onSubmit={this.handlePassword} />
                <FormNew refresh={this.defRefresh} password={this.state.password} />
                </section>
            </div>
        )
    }

}








function Main() {
    return (
        <div>
            <ListeDevoirs />
        </div>)



}

const domContainer = document.querySelector('#root');
ReactDOM.render(e(Main), domContainer);
