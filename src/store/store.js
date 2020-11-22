let store ={
    state:{
        itemTypes:{
            list: [],
            title: '',
            sub_title: '',
        }
    },
    getTypes(types){
        this.state.itemTypes=types;
    }
}
export default store;