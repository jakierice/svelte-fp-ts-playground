import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/function";
import * as S  from "fp-ts/lib/Semigroup";

const semigroupStringWithSpaces: S.Semigroup<string> = {
  concat: (x, y) => x + " " + y,
};

const joinOptionalStringsWithSpaces = S.fold(O.getMonoid(semigroupStringWithSpaces))(O.none)

export const showName: (
  firstName: O.Option<string>,
  middleName: O.Option<string>,
  lastName: O.Option<string>
) => string = (first, middle, last) =>
  pipe(
    joinOptionalStringsWithSpaces([first, middle, last]),
    O.getOrElse(() => "[Name goes here]")
  );
