<template>
  <div class="write-by-spelling">
    Write by spelling
    <br>
    <button type="button" @click="play">Press to Play</button>
    <button type="button" @click="regenerate">Regenerate</button>
    <br>
    <label>
      {{ firstName }} <input type="text" v-model="enteredText">
    </label>
    <br>
    <button type="button" @click="check">Check</button>
  </div>
</template>
<script>
const surnames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Hernandez', 'Moore', 'Martin', 'Jackson', 'Thompson', 'White', 'Lopez', 'Lee', 'Gonzalez', 'Harris', 'Clark', 'Lewis', 'Robinson', 'Walker', 'Perez', 'Hall', 'Young', 'Allen', 'Sanchez', 'Wright', 'King', 'Scott', 'Green', 'Baker', 'Adams', 'Nelson', 'Hill', 'Ramirez', 'Campbell', 'Mitchell', 'Roberts', 'Carter', 'Phillips', 'Evans', 'Turner', 'Torres', 'Parker', 'Collins', 'Edwards', 'Stewart', 'Flores', 'Morris', 'Nguyen', 'Murphy', 'Rivera', 'Cook', 'Rogers', 'Morgan', 'Peterson', 'Cooper', 'Reed', 'Bailey', 'Bell', 'Gomez', 'Kelly', 'Howard', 'Ward', 'Cox', 'Diaz', 'Richardson', 'Wood', 'Watson', 'Brooks', 'Bennett', 'Gray', 'James', 'Reyes', 'Cruz', 'Hughes', 'Price', 'Myers', 'Long', 'Foster', 'Sanders', 'Ross', 'Morales', 'Powell', 'Sullivan', 'Russell', 'Ortiz', 'Jenkins', 'Gutierrez', 'Perry', 'Butler', 'Barnes', 'Fisher', 'Henderson', 'Coleman', 'Simmons', 'Patterson', 'Jordan', 'Reynolds', 'Hamilton', 'Graham', 'Kim', 'Gonzales', 'Alexander', 'Ramos', 'Wallace', 'Griffin', 'West', 'Cole', 'Hayes', 'Chavez', 'Gibson', 'Bryant', 'Ellis', 'Stevens', 'Murray', 'Ford', 'Marshall', 'Owens', 'Mcdonald', 'Harrison', 'Ruiz', 'Kennedy', 'Wells', 'Alvarez', 'Woods', 'Mendoza', 'Castillo', 'Olson', 'Webb', 'Washington', 'Tucker', 'Freeman', 'Burns', 'Henry', 'Vasquez', 'Snyder', 'Simpson', 'Crawford', 'Jimenez', 'Porter', 'Mason', 'Shaw', 'Gordon', 'Wagner', 'Hunter', 'Romero', 'Hicks', 'Dixon', 'Hunt', 'Palmer', 'Robertson', 'Black', 'Holmes', 'Stone', 'Meyer', 'Boyd', 'Mills', 'Warren', 'Fox', 'Rose', 'Rice', 'Moreno', 'Schmidt', 'Patel', 'Ferguson', 'Nichols', 'Herrera', 'Medina', 'Ryan', 'Fernandez', 'Weaver', 'Daniels', 'Stephens', 'Gardner', 'Payne', 'Kelley', 'Dunn', 'Pierce', 'Arnold', 'Tran', 'Spencer', 'Peters', 'Hawkins', 'Grant', 'Hansen', 'Castro', 'Hoffman', 'Hart', 'Elliott', 'Cunningham', 'Knight', 'Bradley', 'Carroll', 'Hudson', 'Duncan', 'Armstrong', 'Berry', 'Andrews', 'Johnston', 'Ray', 'Lane', 'Riley', 'Carpenter', 'Perkins', 'Aguilar', 'Silva', 'Richards', 'Willis', 'Matthews', 'Chapman', 'Lawrence', 'Garza', 'Vargas', 'Watkins', 'Wheeler', 'Larson', 'Carlson', 'Harper', 'George', 'Greene', 'Burke', 'Guzman', 'Morrison', 'Munoz', 'Jacobs', 'Obrien', 'Lawson', 'Franklin', 'Lynch', 'Bishop', 'Carr', 'Salazar', 'Austin', 'Mendez', 'Gilbert', 'Jensen', 'Williamson', 'Montgomery', 'Harvey', 'Oliver', 'Howell', 'Dean', 'Hanson', 'Weber', 'Garrett', 'Sims', 'Burton', 'Fuller', 'Soto', 'Mccoy', 'Welch', 'Chen', 'Schultz', 'Walters', 'Reid', 'Fields', 'Walsh', 'Little', 'Fowler', 'Bowman', 'Davidson', 'May', 'Day', 'Schneider', 'Newman', 'Brewer', 'Lucas', 'Holland', 'Wong', 'Banks', 'Santos', 'Curtis', 'Pearson', 'Delgado', 'Valdez', 'Pena', 'Rios', 'Douglas', 'Sandoval', 'Barrett', 'Hopkins', 'Keller', 'Guerrero', 'Stanley', 'Bates', 'Alvarado', 'Beck', 'Ortega', 'Wade', 'Estrada', 'Contreras', 'Barnett', 'Caldwell', 'Santiago', 'Lambert', 'Powers', 'Chambers', 'Nunez', 'Craig', 'Leonard', 'Lowe', 'Rhodes', 'Byrd', 'Gregory', 'Shelton', 'Frazier', 'Becker', 'Maldonado', 'Fleming', 'Vega', 'Sutton', 'Cohen', 'Jennings', 'Parks', 'Mcdaniel', 'Watts', 'Barker', 'Norris', 'Vaughn', 'Vazquez', 'Holt', 'Schwartz', 'Steele', 'Benson', 'Neal', 'Dominguez', 'Horton', 'Terry', 'Wolfe', 'Hale', 'Lyons', 'Graves', 'Haynes', 'Miles', 'Park', 'Warner', 'Padilla', 'Bush', 'Thornton', 'Mccarthy', 'Mann', 'Zimmerman', 'Erickson', 'Fletcher', 'Mckinney', 'Page', 'Dawson', 'Joseph', 'Marquez', 'Reeves', 'Klein', 'Espinoza', 'Baldwin', 'Moran', 'Love', 'Robbins', 'Higgins', 'Ball', 'Cortez', 'Le', 'Griffith', 'Bowen', 'Sharp', 'Cummings', 'Ramsey', 'Hardy', 'Swanson', 'Barber', 'Acosta', 'Luna', 'Chandler', 'Blair', 'Daniel', 'Cross', 'Simon', 'Dennis', 'Oconnor', 'Quinn', 'Gross', 'Navarro', 'Moss', 'Fitzgerald', 'Doyle', 'Mclaughlin', 'Rojas', 'Rodgers', 'Stevenson', 'Singh', 'Yang', 'Figueroa', 'Harmon', 'Newton', 'Paul', 'Manning', 'Garner', 'Mcgee', 'Reese', 'Francis', 'Burgess', 'Adkins', 'Goodman', 'Curry', 'Brady', 'Christensen', 'Potter', 'Walton', 'Goodwin', 'Mullins', 'Molina', 'Webster', 'Fischer', 'Campos', 'Avila', 'Sherman', 'Todd', 'Chang', 'Blake', 'Malone', 'Wolf', 'Hodges', 'Juarez', 'Gill', 'Farmer', 'Hines', 'Gallagher', 'Duran', 'Hubbard', 'Cannon', 'Miranda', 'Wang', 'Saunders', 'Tate', 'Mack', 'Hammond', 'Carrillo', 'Townsend', 'Wise', 'Ingram', 'Barton', 'Mejia', 'Ayala', 'Schroeder', 'Hampton', 'Rowe', 'Parsons', 'Frank', 'Waters', 'Strickland', 'Osborne', 'Maxwell', 'Chan', 'Deleon', 'Norman', 'Harrington', 'Casey', 'Patton', 'Logan', 'Bowers', 'Mueller', 'Glover', 'Floyd', 'Hartman', 'Buchanan', 'Cobb', 'French', 'Kramer', 'Mccormick', 'Clarke', 'Tyler', 'Gibbs', 'Moody', 'Conner', 'Sparks', 'Mcguire', 'Leon', 'Bauer', 'Norton', 'Pope', 'Flynn', 'Hogan', 'Robles', 'Salinas', 'Yates', 'Lindsey', 'Lloyd', 'Marsh', 'Mcbride', 'Owen', 'Solis', 'Pham', 'Lang', 'Pratt', 'Lara', 'Brock', 'Ballard', 'Trujillo', 'Shaffer', 'Drake', 'Roman', 'Aguirre', 'Morton', 'Stokes', 'Lamb', 'Pacheco', 'Patrick', 'Cochran', 'Shepherd', 'Cain', 'Burnett', 'Hess', 'Li', 'Cervantes', 'Olsen', 'Briggs', 'Ochoa', 'Cabrera', 'Velasquez', 'Montoya', 'Roth', 'Meyers', 'Cardenas', 'Fuentes', 'Weiss', 'Hoover', 'Wilkins', 'Nicholson', 'Underwood', 'Short', 'Carson', 'Morrow', 'Colon', 'Holloway', 'Summers', 'Bryan', 'Petersen', 'Mckenzie', 'Serrano', 'Wilcox', 'Carey', 'Clayton', 'Poole', 'Calderon', 'Gallegos'];
const firstNames = ['Michael', 'James', 'John', 'Robert', 'David', 'William', 'Mary', 'Christopher', 'Joseph', 'Richard', 'Daniel', 'Thomas', 'Matthew', 'Jennifer', 'Charles', 'Anthony', 'Patricia', 'Linda', 'Mark', 'Elizabeth', 'Joshua', 'Steven', 'Andrew', 'Kevin', 'Brian', 'Barbara', 'Jessica', 'Jason', 'Susan', 'Timothy', 'Paul', 'Kenneth', 'Lisa', 'Ryan', 'Sarah', 'Karen', 'Jeffrey', 'Donald', 'Ashley', 'Eric', 'Jacob', 'Nicholas', 'Jonathan', 'Ronald', 'Michelle', 'Kimberly', 'Nancy', 'Justin', 'Sandra', 'Amanda', 'Brandon', 'Stephanie', 'Emily', 'Melissa', 'Gary', 'Edward', 'Stephen', 'Scott', 'George', 'Donna', 'Jose', 'Rebecca', 'Deborah', 'Laura', 'Cynthia', 'Carol', 'Amy', 'Margaret', 'Gregory', 'Sharon', 'Larry', 'Angela', 'Maria', 'Alexander', 'Benjamin', 'Nicole', 'Kathleen', 'Patrick', 'Samantha', 'Tyler', 'Samuel', 'Betty', 'Brenda', 'Pamela', 'Aaron', 'Kelly', 'Heather', 'Rachel', 'Adam', 'Christine', 'Zachary', 'Debra', 'Katherine', 'Dennis', 'Nathan', 'Christina', 'Julie', 'Jordan', 'Kyle', 'Anna'];
const allowedVoiceLangs = ['en-US', 'en', 'en-GB', 'en-AU'];
const getRandomInt = (start = 0, end = 10) => Math.round(Math.random() * (end - start)) + start;

// eslint-disable-next-line no-use-before-define
let voices = populateVoices();
if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = () => {
    // eslint-disable-next-line no-use-before-define
    voices = populateVoices();
  };
}


export default {
  data: () => ({
    currentVoice: '',
    enteredText: '',
    firstName: '',
    surName: '',
  }),
  methods: {
    regenerate() {
      // eslint-disable-next-line no-use-before-define
      const { firstName, surName } = getRandomCombination();
      this.firstName = firstName;
      this.surName = surName;
      // eslint-disable-next-line no-use-before-define
      console.log(wordToSpelling(surName));
    },
    play() {
      // eslint-disable-next-line no-use-before-define
      const voice = getRandomVoice();
      // eslint-disable-next-line no-use-before-define
      speak(`${this.firstName} ${this.surName}. ${wordToSpelling(this.surName)}.`, voice);
    },
    check() {
      // eslint-disable-next-line no-alert
      alert(this.enteredText === this.surName ? 'Answer correct' : 'Incorrect');
    },
  },
};

function getRandomCombination() {
  return {
    firstName: firstNames[getRandomInt(0, firstNames.length - 1)],
    surName: surnames[getRandomInt(0, surnames.length - 1)],
  };
}

function speak(text, voice, { pinch = 1, rate = 0.7 } = {}) {
  if (speechSynthesis.speaking) {
    console.error('speechSynthesis.speaking');
    return;
  }
  if (!text) return;
  const utterThis = new SpeechSynthesisUtterance(text);
  utterThis.onend = () => {
    console.log('SpeechSynthesisUtterance.onend');
  };
  utterThis.onerror = () => {
    console.error('SpeechSynthesisUtterance.onerror');
  };

  utterThis.voice = voice;
  utterThis.pitch = pinch;
  utterThis.rate = rate;
  speechSynthesis.speak(utterThis);
}

function wordToSpelling(word) {
  return word.toUpperCase().split('').join('-');
}

function populateVoices() {
  return speechSynthesis
    .getVoices()
    .filter(voice => allowedVoiceLangs.includes(voice.lang));
}

function getRandomVoice() {
  return voices[getRandomInt(0, voices.length - 1)];
}

</script>
<style lang="stylus">
  .write-by-spelling
    width: 960px
    height 100%
    margin: auto
</style>
