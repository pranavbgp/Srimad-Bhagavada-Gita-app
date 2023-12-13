const chapterVerses = {
  1: 47,
  2: 72,
  3: 43,
  4: 42,
  5: 29,
  6: 47,
  7: 30,
  8: 28,
  9: 34,
  10: 42,
  11: 55,
  12: 20,
  13: 35,
  14: 27,
  15: 20,
  16: 24,
  17: 28,
  18: 78
};  
let currentChapter = 1;
let currentVerse = 1;

async function getVerse() {
  const chapter = document.getElementById('chapterInput').value;
  const verse = document.getElementById('verseInput').value;

  try {
    const response = await fetch(`https://bhagavadgitaapi.in/slok/${chapter}/${verse}/`);
    const data = await response.json();
    document.getElementById('verse').innerHTML = `<strong>${data.slok}</strong>`;
    document.getElementById('translation').innerHTML = data.tej.author + ':' + data.tej.ht;
    document.getElementById('translation2').innerHTML = data.siva.author + ':' + data.siva.et;
    document.getElementById('translation3').innerHTML = data.siva.author + ':' + data.siva.ec;
    currentChapter = parseInt(chapter);
    currentVerse = parseInt(verse);
    updateVerseInfo();
  } catch (error) {
    console.error('Error fetching verse:', error);
  }
}

function getNextVerse() {
  if (currentVerse < chapterVerses[currentChapter]) {
    currentVerse++;
    document.getElementById('verseInput').value = currentVerse;
    getVerse();
  } else {
    if (currentChapter < 18) {
      currentChapter++;
      currentVerse = 1;
      document.getElementById('chapterInput').value = currentChapter;
      document.getElementById('verseInput').value = currentVerse;
      getVerse();
    } else {
      alert('You have reached the end of the Bhagavad Gita.');
    }
  }
}

function getPreviousVerse() {
  if (currentVerse > 1) {
    currentVerse--;
    document.getElementById('verseInput').value = currentVerse;
    getVerse();
  } else {
    if (currentChapter > 1) {
      currentChapter--;
      currentVerse = chapterVerses[currentChapter];
      document.getElementById('chapterInput').value = currentChapter;
      document.getElementById('verseInput').value = currentVerse;
      getVerse();
    } else {
      alert('You are at the beginning of the Bhagavad Gita.');
    }
  }
}

function updateVerseInfo() {
  const remainingVerses = chapterVerses[currentChapter] - currentVerse;
  document.getElementById('currentChapterVerse').innerText = `Chapter ${currentChapter}, Verse ${currentVerse}`;
  document.getElementById('remainingVerses').innerText = `Remaining Verses in Chapter ${currentChapter}: ${remainingVerses}`;
  document.getElementById('totalVerses').innerText = `Total Verses in Chapter ${currentChapter}: ${chapterVerses[currentChapter]}`;
}
