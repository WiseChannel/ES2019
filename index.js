
//#Object.fromEntries

    let students = {
        amelia: 20,
        beatrice: 22,
        cece: 20,
        deirdre: 19,
        eloise: 21
    };

        console.log(Object.entries(students)); // => result -  [
                                                //  [ 'amelia', 20 ],
                                                //  [ 'beatrice', 22 ],
                                                //  [ 'cece', 20 ],
                                                //  [ 'deirdre', 19 ],
                                                //  [ 'eloise', 21 ]
                                                // ]


// --------------------------------------------------------------------------------

// This was a wonderful addition because it allowed objects to make use of the numerous
// functions built into the Array prototype. Things like map, filter, reduce, etc.
// Unfortunately, it required a somewhat manual process to turn that result back into an object.

// --------------------------------------------------------------------------------

    let students = {
        amelia: 20,
        beatrice: 22,
        cece: 20,
        deirdre: 19,
        eloise: 21
    };

    // convert to array in order to make use of .filter() function
    let overTwentyOne = Object.entries(students).filter(([name, age]) => {
        return age >= 21
    }); // [ [ 'beatrice', 22 ], [ 'eloise', 21 ] ]

    // turn multidimensional array back into an object
    let DrinkingAgeStudents = {}
    for (let [name, age] of overTwentyOne) {
        DrinkingAgeStudents[name] = age;
    }
    // { beatrice: 22, eloise: 21 }



// --------------------------------------------------------------------------------

// Object.fromEntries is designed to remove that loop! It gives you much more concise code that
// invites you to make use of array prototype methods on objects.

// --------------------------------------------------------------------------------


    let students = {
        amelia: 20,
        beatrice: 22,
        cece: 20,
        deirdre: 19,
        eloise: 21
    };

    // convert to array in order to make use of .filter() function
    let overTwentyOne = Object.entries(students).filter(([name, age]) => {
        return age >= 21
    }); // [ [ 'beatrice', 22 ], [ 'eloise', 21 ] ]

    // turn multidimensional array back into an object
    let DrinkingAgeStudents = Object.fromEntries(overTwentyOne);
    // { beatrice: 22, eloise: 21 }


// --------------------------------------------------------------------------------

    // It is important to note that arrays and objects are different data structures for a
    // reason. There are certain cases in which switching between the two will cause data loss.
    // The example below of array elements that become duplicate object keys is one of them.

// --------------------------------------------------------------------------------


    let students = [
        [ 'amelia', 22 ],
        [ 'beatrice', 22 ],
        [ 'eloise', 21],
        [ 'beatrice', 20 ]
    ]

    let studentObj = Object.fromEntries(students);
    // { amelia: 22, beatrice: 20, eloise: 21 }
    // dropped first beatrice!


  //When using these functions make sure to be aware of the potential side effects.



//#Array.prototype.flat


// --------------------------------------------------------------------------------

// Multi-dimensional arrays are a pretty common data structure to come across, especially when retrieving data.
// The ability to flatten it is necessary. It was always possible, but not exactly pretty.
// Let’s take the following example where our map leaves us with a multi-dimensional array that we want to flatten.

// --------------------------------------------------------------------------------


    let courses = [
        {
            subject: "math",
            numberOfStudents: 3,
            waitlistStudents: 2,
            students: ['Janet', 'Martha', 'Bob', ['Phil', 'Candace']]
        },
        {
            subject: "english",
            numberOfStudents: 2,
            students: ['Wilson', 'Taylor']
        },
        {
            subject: "history",
            numberOfStudents: 4,
            students: ['Edith', 'Jacob', 'Peter', 'Betty']
        }
    ];

    let courseStudents = courses.map(course => course.students)
    // [
    //   [ 'Janet', 'Martha', 'Bob', [ 'Phil', 'Candace' ] ],
    //   [ 'Wilson', 'Taylor' ],
    //   [ 'Edith', 'Jacob', 'Peter', 'Betty' ]
    // ]

      //  [].concat.apply([], courseStudents) // we're stuck doing something like this


//In comes Array.prototype.flat. It takes an optional argument of depth.

    let courseStudents = [
        [ 'Janet', 'Martha', 'Bob', [ 'Phil', 'Candace' ] ],
        [ 'Wilson', 'Taylor' ],
        [ 'Edith', 'Jacob', 'Peter', 'Betty' ]
    ];

    let flattenOneLevel = courseStudents.flat(1)
    console.log(flattenOneLevel)
    // [
    //   'Janet',
    //   'Martha',
    //   'Bob',
    //   [ 'Phil', 'Candace' ],
    //   'Wilson',
    //   'Taylor',
    //   'Edith',
    //   'Jacob',
    //   'Peter',
    //   'Betty'
    // ]

    let flattenTwoLevels = courseStudents.flat(2)
    console.log(flattenTwoLevels)
    // [
    //   'Janet',   'Martha',
    //   'Bob',     'Phil',
    //   'Candace', 'Wilson',
    //   'Taylor',  'Edith',
    //   'Jacob',   'Peter',
    //   'Betty'
    // ]


//Note that if no argument is given, the default depth is one. This is incredibly important because
// in our example that would not fully flatten the array.


    let courseStudents = [
        [ 'Janet', 'Martha', 'Bob', [ 'Phil', 'Candace' ] ],
        [ 'Wilson', 'Taylor' ],
        [ 'Edith', 'Jacob', 'Peter', 'Betty' ]
    ];

    let defaultFlattened = courseStudents.flat()
    console.log(defaultFlattened);
    // [
    //   'Janet',
    //   'Martha',
    //   'Bob',
    //   [ 'Phil', 'Candace' ],
    //   'Wilson',
    //   'Taylor',
    //   'Edith',
    //   'Jacob',
    //   'Peter',
    //   'Betty'
    // ]


//The justification for this decision is that the function is not greedy by default and
// requires explicit instructions to operate as such. For an unknown depth with the intention of
// fully flattening the array the argument of Infinity can be used.

    let courseStudents = [
        [ 'Janet', 'Martha', 'Bob', [ 'Phil', 'Candace' ] ],
        [ 'Wilson', 'Taylor' ],
        [ 'Edith', 'Jacob', 'Peter', 'Betty' ]
    ];

    let alwaysFlattened = courseStudents.flat(Infinity)
    console.log(alwaysFlattened)
    // [
    //   'Janet',   'Martha',
    //   'Bob',     'Phil',
    //   'Candace', 'Wilson',
    //   'Taylor',  'Edith',
    //   'Jacob',   'Peter',
    //   'Betty'
    // ]


//As always, greedy operations should be used judiciously and are likely not a good
// choice if the depth of the array is truly unknown.

//#Array.prototype.flatMap

//With the addition of flat we also got the combined function of Array.prototype.flatMap. We've actually
// already seen an example of where this would be useful above, but let's look at another one.
// What about a situation where we want to insert elements into an array. Prior to the additions of ES2019,
// what would that look like?

    let grades = [78, 62, 80, 64]

    let curved = grades.map(grade => [grade, grade + 7])
    // [ [ 78, 85 ], [ 62, 69 ], [ 80, 87 ], [ 64, 71 ] ]

    let flatMapped = [].concat.apply([], curved) // now flatten, could use flat but that didn't exist before either
    // [
    //  78, 85, 62, 69,
    //  80, 87, 64, 71
    // ]

//Now that we have Array.prototype.flat we can improve this example slightly.

    let grades = [78, 62, 80, 64];

    let flatMapped = grades.map(grade => [grade, grade + 7]).flat()
    // [
    //  78, 85, 62, 69,
    //  80, 87, 64, 71
    // ]

//But still, this is a relatively popular pattern, especially in functional programming.
// So having it built into the array prototype is great. With flatMap we can do this:


    let grades = [78, 62, 80, 64];

    let flatMapped = grades.flatMap(grade => [grade, grade + 7]);
    // [
    //  78, 85, 62, 69,
    //  80, 87, 64, 71
    // ]



//Now, remember that the default argument for Array.prototype.flat is one. And flatMap is
// the equivalent of combing map and flat with no argument. So flatMap will only flatten one level.

    let grades = [78, 62, 80, 64]

    let flatMapped = grades.flatMap(grade => [grade, [grade + 7]]);
    // [
    //   78, [ 85 ],
    //   62, [ 69 ],
    //   80, [ 87 ],
    //   64, [ 71 ]
    // ]

//#String.trimStart and String.trimEnd

//Another nice addition in ES2019 is an alias that makes some string function names more explicit.
// Previously, String.trimRight and String.trimLeft were available.

    let message = "   Welcome to CS 101    ";
    message.trimRight();
    // '   Welcome to CS 101'
    message.trimLeft();
    // 'Welcome to CS 101   '
    message.trimRight().trimLeft();
    // 'Welcome to CS 101'

//These are great functions, but it was also beneficial to give them names that more aligned with their purpose.
// Removing starting space and ending space.

    let message = "   Welcome to CS 101    ";
    message.trimEnd();
    // '   Welcome to CS 101'
    message.trimStart();
    // 'Welcome to CS 101   '
    message.trimEnd().trimStart();
    // 'Welcome to CS 101'


//#Optional catch binding

//Another nice feature in ES2019 is making an argument in try-catch blocks optional.
// Previously, all catch blocks passed in the exception as a parameter.
// That meant that it was there even when the code inside the catch block ignored it.

    try {
        let parsed = JSON.parse(obj)
    } catch(e) {
        // ignore e, or use
        console.log(obj)
    }


    //This is no longer the case. If the exception is not used in the catch block, then nothing needs
// to be passed in at all.

    try {
        let parsed = JSON.parse(obj)
    } catch {
        console.log(obj)
    }




//#Function.toString() changes

//ES2019 also brought changes to the way Function.toString() operates.
// Previously, it stripped white space entirely.

    function greeting() {
        const name = 'CSS Tricks'
        console.log(`hello from ${name}`)
    }

    greeting.toString()
    //'function greeting() {\nconst name = \'CSS Tricks\'\nconsole.log(`hello from ${name} //`)\n}'


//Now it reflects the true representation of the function in source code.

    function greeting() {
        const name = 'CSS Tricks'
        console.log(`hello from ${name}`)
    }

    greeting.toString()
    // 'function greeting() {\n' +
    //  "  const name = 'CSS Tricks'\n" +
    //  '  console.log(`hello from ${name}`)\n' +
    //  '}'


//This is mostly an internal change, but I can’t help but think this might also make the life easier of a
// blogger or two down the line.

