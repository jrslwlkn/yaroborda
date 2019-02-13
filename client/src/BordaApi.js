import axios from 'axios';

export default class BordaApi {
    _apiBase = 'http://localhost:5000'

    _getResource = (url) => axios
        .get(`${this._apiBase}${url}`)
        .then(data => data.data)
        .catch(console.log)

    _postData = (url, payload) => axios
        .post(`${this._apiBase}${url}`, payload)
        .then(res => res.data)
        .catch(error => error.response.data)

    _filterBoards = (list, name) => list.filter(b => b.theme.toLowerCase().includes(name.toLowerCase()))


    getAllBoards = () => this._getResource('/').then(boards => {
        const result = {};
        const categories = ['other', 'topic', 'it', 'japanese'];
        categories.forEach(name => {
            result[name] = this._filterBoards(boards, name);
        });
        return result;
    })

    getBoardName = (url) => this._getResource('/').then(boards => boards.filter(board => board.url === url)).then(b => b[0].name)

    getBoard = (board) => this._getResource(`/board/${board}`)

    getOpPost = (board, thread) => this._getResource(`/op/${board}/${thread}`)

    getLastPost = (board, thread) => this._getResource(`/lastpost/${board}/${thread}`)

    getOpPost = (board, thread) => this._getResource(`/op/${board}/${thread}`)

    getAllPosts = (board, thread) => this._getResource(`/thread/${board}/${thread}`)


    addThread = (board, payload) => this._postData(`/newthread/${board}`, payload)

    addPost = (board, thread, payload) => this._postData(`/newpost/${board}/${thread}`, payload)


    getSizeBase64 = (bytes) => {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return '0B';
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return `${Math.round(bytes / Math.pow(1024, i), 2)}${sizes[i]}`;
    }
}
