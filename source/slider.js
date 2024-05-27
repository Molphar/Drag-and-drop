import noUiSlider from "nouislider";

export { CreateSlider, AddInput };

const CreateSlider = sliderElement => {
    noUiSlider.create(sliderElement, {
        start: 1,
        range: {
            min: 0,
            max: 100
        },
        step: 1
    });
};

const AddInput = (sliderElement, inputElement) => {
    sliderElement.noUiSlider.on("update", onRangeUpdate);

    function onRangeUpdate(values, handle) {
        const value = Math.trunc(values[handle]);
        inputElement.value = value;
    }

    inputElement.addEventListener("keyup", onNumberInput);
    setInputFilter(inputElement, function(value) {
        return /^\d*$/.test(value);
    });

    function onNumberInput(inputEvent) {
        const value = inputEvent.target.value;
        sliderElement.noUiSlider.set(value);
    }
};

function setInputFilter(input, inputFilter) {
    [
        "input",
        "keydown",
        "keyup",
        "mousedown",
        "mouseup",
        "select",
        "contextmenu",
        "drop"
    ].forEach(function(event) {
        input.addEventListener(event, function(inputEvent) {
            if (inputFilter(inputEvent.currentTarget.value)) {
                if (
                    maxInputNumber !== "" &&
                    inputEvent.currentTarget.value > maxInputNumber
                ) {
                    inputEvent.currentTarget.value = maxInputNumber;
                }
                inputEvent.currentTarget.oldValue =
                    inputEvent.currentTarget.value;
                inputEvent.currentTarget.oldSelectionStart =
                    inputEvent.currentTarget.selectionStart;
                inputEvent.currentTarget.oldSelectionEnd =
                    inputEvent.currentTarget.selectionEnd;
            } else if (inputEvent.currentTarget.hasOwnProperty("oldValue")) {
                inputEvent.currentTarget.value =
                    inputEvent.currentTarget.oldValue;
                inputEvent.currentTarget.setSelectionRange(
                    inputEvent.currentTarget.oldSelectionStart,
                    inputEvent.currentTarget.oldSelectionEnd
                );
            }
        });
    });
}
