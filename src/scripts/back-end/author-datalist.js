const listSearchInputs = document.querySelectorAll("[data-author-search]");

listSearchInputs.forEach((searchInput) => {
    const key = searchInput.dataset.authorSearch;
    const hiddenInput = document.querySelector(`[data-author-hidden="${key}"]`);
    const datalist = document.getElementById(searchInput.getAttribute("list"));

    if (!hiddenInput || !datalist) {
        return;
    }

    const updateHiddenValue = () => {
        const matchingOption = [...datalist.options].find(
            (option) => option.value === searchInput.value
        );

        hiddenInput.value = matchingOption?.dataset.authorId || "";
    };

    searchInput.addEventListener("input", updateHiddenValue);
});
