/* global freezr, alert */
freezr.initPageScripts = function () {
  freezr.promise.ceps.getById('yksiNote', {}).then((response) => {
    if (response && response.text) document.getElementById('the_text').innerText = response.text
  })
    .catch((e) => {
      if (e.message !== 'no related records') alert('Hmmm - there was an error connecting to your freezr:' + e.message)
    })

  document.getElementById('save_button').addEventListener('click', function (e) {
    freezr.promise.feps.create(
      { text: document.getElementById('the_text').innerText }, { data_object_id: 'yksiNote', upsert: true }
    )
      .then((response) => {
        alert(response.error ? 'Oops - there was an error saving.' : 'YAAY, you saved your yksi note on your freezr')
      })
      .catch((error) => {
        alert('Oops - there was an error connecting to your freezr: ' + error.message)
      })
  }, false)

  document.getElementById('publish_button').addEventListener('click', function (e) {
    freezr.promise.perms.setObjectAccess('yksiNote', { name: 'publish_note', grant: true, grantees: ['_public'], table_id: 'org.mydata.yksi' })
      .then((response) => {
        alert(response.error ? ('Oops - there was an error publishing' + response.error) : 'YAAY, you you just published your yksi note')
        return null
      })
      .catch((error) => {
        alert('The note could not be published: ' + error.message)
        return console.log(error)
      })
  }, false)
}
