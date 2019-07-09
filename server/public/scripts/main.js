console.log('js');

$(document).ready(readyNow);

function readyNow() {
  $('#logout').hide();

  const popupUri = 'popup.html';
  $('#login button').click(() => solid.auth.popupLogin({ popupUri }));
  $('#logout button').click(() => solid.auth.logout());

  solid.auth.trackSession(session => {
    const loggedIn = !!session;
    $('#login').toggle(!loggedIn);
    $('#logout').toggle(loggedIn);
    $('#user').text(session && session.webId);
  });

  solid.auth.trackSession(session => {
    if (session) {
      $('#user').text(session.webId);
      if (!$('#profile').val())
        $('#profile').val(session.webId);
    }
  });

  const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
  $('#view').click(async function loadProfile() {
    // Set up a local data store and associated data fetcher
    const store = $rdf.graph();
    const fetcher = new $rdf.Fetcher(store);

    // Load the person's data into the store
    const person = $('#profile').val();
    await fetcher.load(person);

    // Display their details
    const fullName = store.any($rdf.sym(person), FOAF('name'));
    $('#fullName').text(fullName && fullName.value);
  });
}
