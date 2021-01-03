<script lang="ts">
  import * as O from "fp-ts/lib/Option";
  import { pipe } from "fp-ts/lib/function";
  import { makeFormStore } from "./stores";
  import { showName } from "./helpers";

  interface User {
    firstName: string;
    lastName: string;
    middleName: O.Option<string>;
  }

  type FormValues = Record<keyof User, O.Option<string>>;
  const initialValues: FormValues = {
    firstName: O.none,
    middleName: O.none,
    lastName: O.none,
  };
  const formStore = makeFormStore(initialValues);
  $: formValues = $formStore;

  type InputChangeHandler<T> = (
    field: T
  ) => svelte.JSX.EventHandler<Event, HTMLInputElement>;
  const handleInputChange: InputChangeHandler<keyof User> = (field) => (
    event
  ) =>
    formStore.update((formData) => ({
      ...formData,
      [field]: pipe(
        event.currentTarget.value,
        O.fromPredicate((v) => v !== "")
      ),
    }));
</script>

<main>
  <h1>
    Hello,
    {showName(formValues.firstName, formValues.middleName, formValues.lastName)}
  </h1>
  <label>
    First Name
    <input
      value={pipe( formValues.firstName, O.getOrElse(() => '') )}
      on:input={handleInputChange('firstName')} />
  </label>

  <label>
    Middle Name
    <input
      value={pipe( formValues.middleName, O.getOrElse(() => '') )}
      on:input={handleInputChange('middleName')} />
  </label>

  <label>
    Last Name
    <input
      value={pipe( formValues.lastName, O.getOrElse(() => '') )}
      on:input={handleInputChange('lastName')} />
  </label>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
