/* ==========================================================================
   GLOBAL THREADS, LOCAL HEARTS  ·  EDIT EVERYTHING HERE
   ==========================================================================

   This is the ONLY file you need to touch to update the website's content.
   Change the text between the 'quote marks', save the file, and the site
   updates itself. You do not need to know how to code.

   THREE RULES SO YOU DON'T BREAK IT:
     1. Keep the 'quote marks' around text. Change what's INSIDE them.
     2. Keep the commas at the end of each line.
     3. If your text contains an apostrophe, write it like this:
            'Monroe\'s community'      <- backslash before the apostrophe
        ...or just use double quotes instead:
            "Monroe's community"

   ANYTHING WRITTEN IN [SQUARE BRACKETS] IS A PLACEHOLDER. Replace it.

   Search this file for "TODO" to find every placeholder at once.
   ========================================================================== */

export const config = {
  /* ------------------------------------------------------------------------
     1 · THE BASICS
     Shows up in the header, the footer, the browser tab, and social previews.
     ------------------------------------------------------------------------ */
  site: {
    name: 'Global Threads, Local Hearts',
    tagline: 'Every piece of clothing carries a story. Let’s pass it on.',

    school: 'Marvin Ridge High School',

    // TODO: replace with the school year / months your drive runs
    season: '2026–2027',

    // The city you're collecting in
    city: 'Marvin, North Carolina',

    // TODO: after you deploy, paste your real website address here.
    // This is used for social-media link previews. Keep the trailing slash.
    url: 'https://example.com/',

    // One-sentence description used for Google results and link previews.
    // Keep it under ~155 characters.
    description:
      'A student-run IB CAS clothing drive collecting gently used clothing for Heart for Monroe, a nonprofit serving people facing hunger and homelessness in Monroe, NC.',
  },

  /* ------------------------------------------------------------------------
     2 · NAVIGATION
     The links across the top of every page. Reorder or rename freely.
     'href' must match a real .html file in the project folder.
     ------------------------------------------------------------------------ */
  nav: [
    { label: 'Home', href: 'index.html' },
    { label: 'Donate', href: 'donate.html' },
    { label: 'The Cause', href: 'cause.html' },
    { label: 'Our Story', href: 'story.html' },
    { label: 'Team', href: 'team.html' },
    { label: 'Gratitude', href: 'thanks.html' },
    { label: 'Contact', href: 'contact.html' },
  ],

  /* ------------------------------------------------------------------------
     3 · THE NUMBERS  (home page counters + progress bar)

     Update these as your drive grows. This is the part you'll edit most.
     Use plain numbers with no commas: write 1250, not 1,250.
     ------------------------------------------------------------------------ */
  impact: {
    // Your target number of clothing items. The progress bar fills toward this.
    goal: 1700,

    // Numbers shown in the big counter row. 'value' counts up when scrolled to.
    // Add 'suffix' to put a character after the number, like the + on 1500+.
    stats: [
      { value: 1550, suffix: '+', label: 'Items collected', note: 'and counting' },
      { value: 37, label: 'Bags donated', note: 'delivered to Monroe' },
      { value: 3, label: 'Student volunteers', note: 'on the team' },
      { value: 2, label: 'Collection points', note: 'across the county' },
    ],

    // TODO: update this line whenever you make a delivery.
    lastUpdated: 'September 24, 2026',
  },

  /* ------------------------------------------------------------------------
     4 · WHAT WE ACCEPT / DON'T ACCEPT  (donate page)
     Add or remove lines. Each line is one item in the list.
     ------------------------------------------------------------------------ */
  accept: {
    yes: [
      'Clean, gently used clothing for all ages, babies to adults',
      'Coats, jackets, hoodies and warm layers',
      'Jeans, pants, shorts, skirts and dresses',
      'Shirts, T-shirts, sweaters and blouses',
      'Shoes in good condition, with both shoes tied or banded together',
      'Socks and belts, new or freshly laundered',
      'Hats, gloves and scarves',
      'Work-appropriate clothing for job interviews',
      'School uniform pieces in wearable condition',
    ],
    no: [
      'Torn, ripped or heavily worn clothing',
      'Stained or visibly soiled items',
      'Undergarments and used swimwear',
      'Single shoes, or shoes with holes or separating soles',
      'Anything wet, mildewed or smoke-damaged',
      'Clothing that still needs repairs to be wearable',
      'Hangers, dry-cleaning bags and plastic packaging',
    ],
    // The honest test we ask people to apply
    rule: 'Would you give it to a friend? If yes, we’d love it. If not, please recycle it instead.',
  },

  /* ------------------------------------------------------------------------
     5 · HOW TO PREPARE A DONATION  (the "care label" checklist)
     Five short steps. Keep each 'text' to one sentence.
     ------------------------------------------------------------------------ */
  careSteps: [
    { step: 'Wash',  text: 'Launder everything before you bag it. Clean clothes can be handed out the same day they arrive.' },
    { step: 'Check', text: 'Look for holes, missing buttons, broken zips and stains. If it needs a repair, it needs a repair.' },
    { step: 'Fold',  text: 'Fold each item flat. Folded donations are sorted in a fraction of the time.' },
    { step: 'Bag',   text: 'Use a sturdy bag or box you don’t need back. Please don’t overfill it. We have to carry it.' },
    { step: 'Label', text: 'Tape a note on the outside with the sizes inside, like “Kids 4–6” or “Men’s L”.' },
  ],

  /* ------------------------------------------------------------------------
     6 · WHERE TO DROP THINGS OFF  (donate page)

     TODO: replace all of these with your real locations, dates and times.
     Add as many blocks as you need. Copy one from { to }, and paste.
     ------------------------------------------------------------------------ */
  collectionPoints: [
    {
      name: 'Marvin Efird Park',
      address: '8909 New Town Rd, Waxhaw, NC 28173',
      when: 'Collection days only, 10:00am – 2:00pm',
      dates: 'Saturday 10 October & Saturday 7 November 2026',
      note: 'Find us by the main parking lot. Stay in your car if it’s easier. Pop the trunk and we’ll take it from there.',
      primary: true, // `true` highlights this card as the main location
    },
    {
      name: 'Heart for Monroe',
      address: '104 S Hayne St, Monroe, NC 28112',
      when: 'Tuesdays & Thursdays 10:00am – 1:00pm · 1st & 3rd Tuesdays 6:00pm – 7:30pm',
      dates: 'Year-round, during their own hours',
      note: 'Our partner’s donation door. If our collection days don’t suit you, take your bag straight here. It reaches the same people either way.',
      primary: false,
    },
  ],

  // Big collection days. The events you promote on social media.
  // TODO: replace with your real dates, or delete any you don't need.
  collectionDays: [
    { date: 'Sat, 10 October', time: '10am – 2pm', place: 'Marvin Efird Park', detail: 'Drive-through drop-off. Stay in your car, pop the trunk, we do the rest.' },
    { date: 'Sat, 7 November', time: '10am – 2pm', place: 'Marvin Efird Park', detail: 'Our last push before the cold sets in. Coats and warm layers especially welcome.' },
  ],

  /* ------------------------------------------------------------------------
     7 · CAN'T DROP OFF? Other ways to help (used on the home + donate pages)
     ------------------------------------------------------------------------ */
  otherWays: [
    { title: 'Host a bin', text: 'If you run a business, office, church or team, we’ll deliver a labeled bin and collect it when it’s full.' },
    { title: 'Run a mini-drive', text: 'Ask your neighborhood, sports team or club to fill one bag each. Ten bags is a rack of clothing.' },
    { title: 'Share the link', text: 'Post this site to your story. Most of our donations come from someone telling someone else.' },
    { title: 'Volunteer an afternoon', text: 'We sort, fold and pack every week. Extra hands make it fly by, and it counts for service hours.' },
  ],

  /* ------------------------------------------------------------------------
     8 · OUR PARTNER: HEART FOR MONROE  (the cause page)
     These details were taken from heartformonroe.com. Check them before a
     big push in case anything has changed.
     ------------------------------------------------------------------------ */
  partner: {
    name: 'Heart for Monroe',
    what: 'A Monroe, North Carolina nonprofit that unites churches, community organizations, businesses and individuals to address hunger, homelessness and mentoring.',
    address: '104 S Hayne St, Monroe, NC 28112',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=104+S+Hayne+St%2C+Monroe%2C+NC+28112',
    phone: '(866) 367-8833',
    phoneHref: 'tel:+18663678833',
    website: 'https://heartformonroe.com',

    // TODO: confirm these handles/links before you publish.
    facebook: 'https://www.facebook.com/heartformonroe',
    instagram: 'https://www.instagram.com/heartformonroe',

    // Their donation drop-off hours, for people who'd rather deliver directly.
    hours: [
      'Tuesdays & Thursdays, 10:00am – 1:00pm',
      '1st & 3rd Tuesdays, 6:00pm – 7:30pm',
      'Or by appointment',
    ],

    programs: [
      {
        name: 'Light It Up',
        text: 'A regular community gathering offering hot food, food boxes, clothing and live music, held in the open, for anyone who comes.',
      },
      {
        name: 'Transitional support',
        text: 'Practical help for families moving out of homelessness and into housing, including the clothing they need to start work again.',
      },
      {
        name: 'Mentoring',
        text: 'Long-term relationships with young people and families, so support continues after the immediate need is met.',
      },
    ],

    // Shown in a prominent banner. Please keep something like this. It matters
    // ethically, and IB examiners will look for it.
    disclaimer:
      'We are a student project that collects clothing for Heart for Monroe. This website is not run by Heart for Monroe, and we don’t speak for them. For anything official, including financial donations, please go directly to heartformonroe.com.',
  },

  /* ------------------------------------------------------------------------
     9 · WHY CLOTHING? The short argument for the project (cause page)
     ------------------------------------------------------------------------ */
  whyClothing: [
    {
      stat: 'Dignity',
      title: 'Clothing is not a small thing',
      text: 'A clean interview shirt, a coat that fits, shoes without holes. These are the things that let someone walk into a room and be seen as themselves rather than as their situation.',
    },
    {
      stat: 'Waste',
      title: 'The clothes already exist',
      text: 'Most of us own things we have not worn in a year. Sending them to a neighbour instead of a landfill costs nothing and solves two problems at once.',
    },
    {
      stat: 'Local',
      title: 'Twenty minutes away',
      text: 'Everything collected here stays here. It goes to Hayne Street, into the hands of people living in the same county as us.',
    },
  ],

  /* ------------------------------------------------------------------------
     10 · CAS JOURNEY: the five IB CAS stages (our story page)
     Replace the 'text' with what your group actually did.
     ------------------------------------------------------------------------ */
  casStages: [
    {
      stage: 'Investigation',
      date: 'April 2026',
      text: 'We started by asking what our community actually needed rather than what would be convenient for us to give. We researched local nonprofits, read about clothing insecurity in Union County, and contacted Heart for Monroe to ask what they were short of. The answer shaped the whole project: clean, wearable, seasonally appropriate clothing, especially for children and for adults heading into job interviews.',
    },
    {
      stage: 'Preparation',
      date: 'May 2026',
      text: 'We divided responsibilities, built a timeline around the school calendar, and got permission for bins on campus. We designed labels, wrote the sorting guidelines, and worked out the logistics we had underestimated: who transports the bags, where they are stored, what we do with items we cannot accept. We also agreed on a rule we kept returning to: we would not pass on anything we would not give a friend.',
    },
    {
      stage: 'Action',
      date: 'June – September 2026',
      text: 'We launched the drive, ran collection days, and sorted every donation by hand: washing, checking, folding, bagging and labeling by size. We posted updates, chased leads for new bin locations, and made deliveries to Heart for Monroe on Hayne Street. Some weeks were quiet. Some weekends filled a car.',
    },
    {
      stage: 'Reflection',
      date: 'Ongoing since May 2026',
      text: 'We reflected as we went rather than only at the end: after each collection day, and as a group at the halfway point. We wrote about what surprised us, what we got wrong, and what we would do differently. The honest reflections are the ones further down this page.',
    },
    {
      stage: 'Demonstration',
      date: 'September 2026',
      text: 'This website is part of our demonstration: a public record of what we did, what we learned, and how others can continue it. We also presented to our CAS coordinator and handed over our documentation so next year’s students can run the drive again without starting from scratch.',
    },
  ],

  /* ------------------------------------------------------------------------
     11 · CAS LEARNING OUTCOMES  (our story page)
     Shown as woven tags. Keep the ones your project genuinely addresses.
     it's better to claim four honestly than seven vaguely.
     ------------------------------------------------------------------------ */
  learningOutcomes: [
    {
      code: 'LO 2',
      title: 'Undertaking new challenges',
      text: 'None of us had organized anything at this scale before. Asking a business to host a bin, or negotiating storage space at school, meant learning to be turned down and ask again.',
    },
    {
      code: 'LO 3',
      title: 'Planning and initiating activities',
      text: 'We initiated the drive ourselves: the research, the partnership, the timeline, the logistics and the publicity were all ours to plan and to fix when they went wrong.',
    },
    {
      code: 'LO 4',
      title: 'Showing commitment and perseverance',
      text: 'The drive ran across months, not days. We kept sorting on the weeks when the bins came back nearly empty, which turned out to be the real test.',
    },
    {
      code: 'LO 5',
      title: 'Working collaboratively',
      text: 'We worked as a team with each other and with adults outside school: staff, bin hosts and the volunteers at Heart for Monroe who told us what they actually needed.',
    },
    {
      code: 'LO 6',
      title: 'Engaging with issues of global significance',
      text: 'Clothing insecurity and textile waste are global problems that show up locally. We met both in the same bag of donations.',
    },
    {
      code: 'LO 7',
      title: 'Recognising and considering ethics',
      text: 'We had to decide what not to pass on. Giving away damaged clothing moves a disposal problem onto people with fewer resources, so we set a standard and held to it even when it reduced our numbers.',
    },
  ],

  /* ------------------------------------------------------------------------
     12 · REFLECTIONS  (our story page)

     TODO: replace this placeholder text with your own writing. Honest, specific
     reflections, including what went badly, score far better than summaries
     of what happened. One moment per card is plenty.
     ------------------------------------------------------------------------ */
  reflections: [
    {
      author: 'Vidyuth Ashok Kumar',
      role: 'Co-founder',
      date: 'August 2026',
      title: 'The car',
      text: 'Our car isn\u2019t big and we worked that out fast. Coats take up way more room than you\u2019d think. One bag of winter stuff is basically two bags of anything else.\n\nThe August run was the best one. We had all the back seats down and it still didn\u2019t fit, so Abhi had a bag on his lap the whole way and there was one wedged behind my head where I couldn\u2019t really see out the back. We drove all the way to Hayne Street like that and laughed about it at every stop sign.\n\nThe thing is we didn\u2019t ask for most of it. People heard from other people. Two houses on our street that we never even knocked on just left bags out front with the sizes written on the side. Somebody\u2019s mom flagged us down while we were loading and went back inside for more.\n\nI sat in the parking lot after we unloaded and I was just happy. All of that was in someone\u2019s closet three weeks earlier. Thirty seven bags so far. We are going to need a bigger car.',
    },
    {
      author: 'Abhi Tokala',
      role: 'Co-founder',
      date: 'September 2026',
      title: 'A note in a box',
      text: 'We were sorting in September and someone had taped a note inside the lid of a box. She\u2019d written the sizes on the outside like we ask people to, so we already liked her.\n\nThe note said the blue coat was her husband\u2019s, that he had not worn it since 2019 and was not going to, and that somebody out there should get some use out of it. She signed it \u201cfrom the house with the loud dog\u201d, which took us about four seconds to work out.\n\nNobody said anything for a second. Then Anish said \u201cwe should write back\u201d completely seriously and everyone lost it, and then we actually did write back. Ms. Romney let us use the printer.\n\nThat is the part I did not see coming. I thought this was going to be bins and dates and whether we have enough bags, and it is that, someone has to think about it. But somehow half the town knows what we are doing now. People bring it up to us in the grocery store.\n\nWe still have the note. It is in the folder with our planning stuff, which is probably a weird place to keep it.',
    },
    {
      author: 'Anish Alleti',
      role: 'Volunteer',
      date: 'September 2026',
      title: 'I came for the service hours',
      text: 'Being honest, I came to the first sort in August because I needed service hours. Someone said there would be music, which helped.\n\nI didn\u2019t think I\u2019d like it. You sit on the floor with a pile of coats and sort them by size and someone puts on a playlist that everyone complains about and then somehow it is two hours later. That is it, that is the whole thing. But I came back the next week and I didn\u2019t need the hours anymore.\n\nThe folding is what I\u2019d tell people about. Somebody washed this sweater before they gave it away. A stranger washed a sweater for a stranger. Then you fold it and put it on the right pile, and you do that maybe a hundred times in an afternoon, and the pile turns into an actual rack of clothes that people walk up to and take.\n\nI brought two friends in September and one of them brought his sister. My mom asked why I was still going and I said because it is fun, which sounds fake, but it is.',
    },
  ],

  /* ------------------------------------------------------------------------
     13 · PHOTO GALLERY  (our story page)

     HOW TO ADD YOUR PHOTOS:
       1. Put the image files in the 'public' folder.
       2. Set 'src' to '/your-file-name.jpg'  (the leading slash matters).
       3. Always write a real 'alt' description. It's read aloud to visitors
          using screen readers, and shows if the image fails to load.
       4. Leave 'src' as null to keep the placeholder block.

     PLEASE get permission before posting photos of people, and avoid
     photographing the people receiving donations.
     ------------------------------------------------------------------------ */
  gallery: [
    { src: '/photos/porch-pickup.jpg',           alt: 'Three of us on a front porch holding a bag of donated clothes, giving a thumbs up.',                  caption: 'First pickup of the round',        tall: true  },
    { src: '/photos/neighborhood-round.jpg',     alt: 'Three of us outside holding two white bags of clothing tied shut with orange cord.',                   caption: 'Two more from down the street',    tall: true  },
    { src: '/photos/doorstep-collection.jpg',    alt: 'Two volunteers in a front yard, one holding a full white bag of donations.',                           caption: 'One bag at a time',                tall: false },
    { src: '/photos/twelve-bags.jpg',            alt: 'Twelve full bags of clothing spread across a driveway with three of us standing behind them.',         caption: 'One driveway, twelve bags',        tall: false },
    { src: '/photos/loading-up.jpg',             alt: 'Two of us carrying oversized black bags of clothing toward an open car trunk in a parking lot.',       caption: 'Heavier than they look',           tall: false },
    { src: '/photos/car-full.jpg',               alt: 'Inside a packed car, bags of clothing filling the back seat between three passengers.',                caption: 'The car that would not close',     tall: true  },
    { src: '/photos/unloading.jpg',              alt: 'Unloading black bags of clothing from a car trunk on the street outside Heart for Monroe.',            caption: 'Unloading on Hayne Street',        tall: true  },
    { src: '/photos/last-bag.jpg',               alt: 'Leaning into the back seat to pull out the last bag of clothing.',                                     caption: 'Last one out of the back seat',    tall: true  },
    { src: '/photos/delivered-hayne-street.jpg', alt: 'Bags of donated clothing piled on tables inside Heart for Monroe, clothing racks behind them.',        caption: 'Dropped off, ready to sort',       tall: false },
    { src: '/photos/drop-off-day.jpg',           alt: 'Three of us beside a table of donated bags at Heart for Monroe, racks of clothes filling the room.',   caption: 'Delivered, Heart for Monroe',      tall: false },
  ],

  /* ------------------------------------------------------------------------
     14 · THE TEAM  (team page)

     TODO: replace with your real names and roles.
     'tag' is the small text at the top of each hanging tag. Have fun with it.
     Copy a block from { to } to add another member.
     ------------------------------------------------------------------------ */
  team: [
    { name: 'Vidyuth Ashok Kumar', role: 'Co-founder', tag: 'Since April 2026',  text: 'Started the drive with Abhi in April. Handles the partnership with Heart for Monroe, the deliveries, and the trunk of the car.' },
    { name: 'Abhi Tokala',         role: 'Co-founder', tag: 'Since April 2026',  text: 'Co-founded the drive in April. Runs outreach, collection days, and the sorting standard we refuse to lower.' },
    { name: 'Anish Alleti',        role: 'Volunteer',  tag: 'Since August 2026', text: 'Joined for the August sort and kept coming back. Sorts, folds, labels, and picks the playlist.' },
  ],

  // TODO: your CAS supervisor / coordinator. Delete this block if you'd rather
  // not name a staff member.
  supervisor: {
    name: 'Ms. Romney',
    role: 'CAS Coordinator, Marvin Ridge High School',
    text: 'Signed off every plan we brought her, found us somewhere to keep the bags, and asked the awkward questions early enough for them to be useful.',
  },

  /* ------------------------------------------------------------------------
     15 · THANK YOU  (thanks page)

     The people and places whose clothing actually filled the bags.
     Add names as donations come in. The layout handles any number of them,
     from three to three hundred.

     ⚠ PLEASE ASK BEFORE YOU LIST SOMEONE. Being named on a public website is
     not something to assume consent for. If you're unsure, use a first name
     and last initial ('Sarah K.'), or leave them off entirely.
     ------------------------------------------------------------------------ */
  thanks: {
    intro:
      'Not one item on this site came from us. Every bag arrived because somebody looked at their wardrobe and decided it could do more good somewhere else. These are the people and places who made that decision.',

    // Individual and family donors.
    // TODO: replace these examples with real names as donations come in.
    people: [
      'Sid', 'Sahasra', 'Ronit', 'Aayush', 'Josh',
      'Avi T', 'Avi D', 'Abhinav', 'Nikith', 'Aarav R',
      'Jason', 'Karthika', 'Adithi', 'Devin', 'Aarav S',
      'Romir', 'Adrika', 'Loky', 'Audrey',
    ],

    // Businesses, shops, churches and schools that gave clothing or hosted a bin.
    // Set 'url' to null if they don't have a website you want to link to.
    organizations: [
      {
        name: 'Goodwill Second Editions',
        place: 'Charlotte, North Carolina',
        text: 'Donated clothing to the drive. A large share of what we delivered to Heart for Monroe started on their shelves.',
        url: null,
      },
    ],

    // Classes, teams, clubs and families who ran a mini-drive of their own.
    // Empty on purpose for now. Add a name here the moment a group runs one and
    // the invitation below is replaced by the list.
    groups: [],

    // Shown while 'groups' is still empty.
    groupsInvite:
      'Nobody has done this yet, so the first name here is going spare. If your class, team or club fills one bag each and brings the whole lot in together, that is usually ten bags in a week, and we will put you at the top of this list.',

    // Shown under the wall of names. Please keep something like this.
    note: 'We only name people who have told us they’re happy to be listed. If you’d like your name taken down, or added, email us and we’ll change it the same day.',
  },

  /* ------------------------------------------------------------------------
     16 · CONTACT  (contact page + footer)
     ------------------------------------------------------------------------ */
  contact: {
    // This address is published on every page, so it will attract some spam.
    // If that becomes a nuisance, swap it for a dedicated project address.
    email: 'vidyuth.ashok@gmail.com',

    // Social handle. While 'handle' is null the Instagram row is hidden from
    // the contact page. To switch it back on, put the handle back and set the
    // matching URL below, e.g. handle: '@globalthreadsmr'.
    handle: null,
    instagram: null,

    responseTime: 'We’re students, so give us a couple of days. We answer everything.',

    // The contact form emails you via a plain mailto: link, which works on a
    // static site with no setup. To use a real form service instead, see the
    // "Connecting a real form" section of README.md and paste the endpoint URL
    // here. Leave it as null to keep using mailto.
    formEndpoint: null,

    // Reasons someone might get in touch (the dropdown in the contact form)
    topics: [
      'I’d like to donate clothing',
      'I want to host a collection bin',
      'I’d like to volunteer',
      'I’m a teacher or student who wants to run this',
      'Press or school newsletter',
      'Something else',
    ],
  },

  /* ------------------------------------------------------------------------
     17 · SMALL DETAILS
     The little woven labels and the scrolling ticker. Change the words,
     keep the structure.
     ------------------------------------------------------------------------ */
  details: {
    // The marquee strip that scrolls across the home page.
    marquee: ['Donate', 'Wear', 'Share', 'Repeat'],

    // Woven care-label badges sprinkled through the site.
    labels: ['100% Community', 'Handle with Care', 'Made in Marvin', 'Wash Before Wearing', 'Student Run'],

    // Footer credit line
    credit: 'Designed, written and built by students.',
  },
}

export default config
