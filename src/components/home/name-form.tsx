interface FormElements extends HTMLFormControlsCollection {
  nameInput: HTMLInputElement;
}

interface NameFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function NameForm({
  onSubmitName,
}: {
  onSubmitName: (name: string) => void;
}) {
  function handleSubmit(event: React.FormEvent<NameFormElement>) {
    event.preventDefault();
    onSubmitName(event.currentTarget.elements.nameInput.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nameInput">Name</label>
        <input id="nameInput" type="text"></input>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
