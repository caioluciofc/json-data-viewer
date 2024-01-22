/**
  # App Padding Spaces

  <br/>

  - `Paddings.large` = 20
  - `Paddings.medium` = 16
  - `Paddings.small` = 12
  - `Paddings.micro` = 6

  <br/>

  ## How to use?

  ```
  const styles = StyleSheet.create({
    medium: {
      paddingBottom: Paddings.medium,
    },
  });
  ```
*/
export class Paddings {
  /**
   # large === 20
  */
  static large = 20;
  /**
   ## medium === 16
  */
  static medium = 16;
  /**
   ### small === 12
  */
  static small = 12;
  /**
   ### micro === 6
  */
  static micro = 6;
}
