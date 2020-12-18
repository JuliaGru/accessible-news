export const state = () => ({
    screenReader: false,
    theme: 'theme-default',
})

export const mutations = {
    setReader (state, bool) {
        state.screenReader = bool;
    },
    setTheme (state, theme) {
      state.theme = theme;
    },
}
