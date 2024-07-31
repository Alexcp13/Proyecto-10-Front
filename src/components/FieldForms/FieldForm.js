

export const FieldForm = (labelText, type, className) => {
    return `
     <div>
        <label>${labelText}</label>
        <input type="${type}" class="${className}" />
    </div>`;
}