export const state = () => ({
    screenReader: false,
})

export const mutations = {
    setReader (state, bool) {
        state.screenReader = bool;
    },
}
