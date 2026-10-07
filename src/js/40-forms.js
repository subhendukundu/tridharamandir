/* Forms: check the fields, then send them to the form service set in content/site.json (forms.endpoint),
   or, until one is connected, show the visitor a summary they can send to the mandir. */
(function () {
  'use strict';
  var T = window.TMM, D = T.data;

  function labelFor(form, el) {
    var fs = el.closest('fieldset');
    if ((el.type === 'radio' || el.type === 'checkbox') && fs) {
      return fs.getAttribute('data-label') || (fs.querySelector('legend') ? fs.querySelector('legend').textContent.trim() : el.name);
    }
    if (el.getAttribute('data-label')) return el.getAttribute('data-label');
    var l = el.id ? form.querySelector('label[for="' + el.id + '"]') : null;
    if (!l) return el.name;
    var en = l.querySelector('.field__en');
    return (en ? en.textContent : l.textContent).replace(/\*/g, '').trim();
  }

  function errorFor(el) {
    var v = el.validity;
    var rule = el.getAttribute('data-validate');
    var val = (el.value || '').trim();
    if (v && v.badInput) return el.type === 'number' ? 'Please enter a number.' : 'Please check this.';   // before "fill this in": the browser reports what was typed as empty
    if (v && v.valueMissing) return 'Please fill this in.';
    if (rule === 'phone-or-email' && val) {
      var isMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), digits = val.replace(/\D/g, '').length;
      if (!isMail && digits < 10) return 'Please enter a phone number with at least 10 digits, or an email address.';
    }
    if (el.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Please enter an email address, like name@example.com.';
    if (el.type === 'tel' && val && val.replace(/\D/g, '').length < 10) return 'Please enter a phone number with at least 10 digits.';
    var nice = function (x) { var m = /^(\d{4})-(\d\d)-(\d\d)$/.exec(x); return m ? T.fmtDate(new Date(+m[1], m[2] - 1, +m[3])) : x; };
    if (v && v.rangeUnderflow) return el.type === 'date' ? 'Please choose ' + nice(el.min) + ' or later.' : 'Please enter ' + el.min + ' or more.';
    if (v && v.rangeOverflow) return el.type === 'date' ? 'Please choose ' + nice(el.max) + ' or earlier.' : 'Please enter ' + el.max + ' or less.';
    if (v && v.stepMismatch && el.type === 'number') {   // amounts and counts are whole numbers (step="1", or no step at all)
      var step = el.getAttribute('step');
      return !step || +step === 1 ? 'Please enter a whole number.' : 'Please enter a number in steps of ' + step + '.';
    }
    if (v && !v.valid) return 'Please check this.';
    return '';
  }

  function showError(el, msg) {
    var id = (el.id || el.name) + '-err';
    var err = document.getElementById(id);
    var box = el.closest('.field') || el.parentNode;
    if (msg) {
      if (!err) { err = document.createElement('span'); err.id = id; err.className = 'field__err'; box.appendChild(err); }
      err.textContent = msg;
      el.setAttribute('aria-invalid', 'true');
      var d = (el.getAttribute('aria-describedby') || '').split(' ').filter(Boolean);
      if (d.indexOf(id) < 0) { d.push(id); el.setAttribute('aria-describedby', d.join(' ')); }
    } else {
      if (err) err.remove();
      el.removeAttribute('aria-invalid');
      var d2 = (el.getAttribute('aria-describedby') || '').split(' ').filter(function (x) { return x && x !== id; });
      if (d2.length) el.setAttribute('aria-describedby', d2.join(' ')); else el.removeAttribute('aria-describedby');
    }
  }

  T.formSummary = function (form) {
    var lines = [], seen = {};
    T.qsa('input, select, textarea', form).forEach(function (el) {
      if (!el.name || el.type === 'hidden' || el.type === 'submit' || el.disabled) return;
      if ((el.type === 'radio' || el.type === 'checkbox') && !el.checked) return;
      var val = el.tagName === 'SELECT' ? (el.options[el.selectedIndex] ? el.options[el.selectedIndex].text : '') : el.value;
      if (el.type === 'radio' || el.type === 'checkbox') {
        var lab = el.closest('label'); val = el.getAttribute('data-text') || (lab ? lab.textContent.replace(/\s+/g, ' ').trim() : el.value);
      }
      val = (val || '').trim();
      if (!val) return;
      var dm = el.type === 'date' && /^(\d{4})-(\d\d)-(\d\d)$/.exec(val);
      if (dm) val = T.fmtDate(new Date(+dm[1], dm[2] - 1, +dm[3]));
      if (el.getAttribute('data-format') === 'inr' && /^\d+$/.test(val)) val = '₹' + Number(val).toLocaleString('en-IN');
      var k = labelFor(form, el);
      if (seen[k] && (el.type === 'checkbox')) { lines[seen[k] - 1] += ', ' + val; return; }
      lines.push(k + ': ' + val); seen[k] = lines.length;
    });
    if (typeof form.tmmExtra === 'function') lines = lines.concat(form.tmmExtra() || []);
    return lines;
  };

  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

  function copyLine(value, href) {
    var w = el('span', 'copyval');
    var v = href && !T.staging ? el('a', 'copyval__v', value) : el('span', 'copyval__v', value);
    if (href && !T.staging) v.href = href;
    var b = el('button', 'copyval__b', 'Copy'); b.type = 'button'; b.setAttribute('data-copy', value); b.setAttribute('aria-label', 'Copy ' + value);
    w.appendChild(v); w.appendChild(b); return w;
  }

  function showResult(form, mode, lines) {
    var box = form.querySelector('[data-form-result]');
    if (!box) { box = el('div', 'form-result'); box.setAttribute('data-form-result', ''); box.tabIndex = -1; form.appendChild(box); }
    box.innerHTML = '';
    var subject = form.getAttribute('data-subject') || 'Message from the website';
    var text = subject + '\n' + lines.join('\n');
    if (mode === 'sent') {
      /* a form may say its own thank-you (data-sent) and the line under it (data-sent-note; empty: none), e.g. a sign-up */
      var note = form.hasAttribute('data-sent-note') ? form.getAttribute('data-sent-note')
        : 'The seva desk is open 8 AM–6 PM daily, India time. For anything urgent, call ' + D.contact.phone + '.';
      box.appendChild(el('p', 'form-result__h', form.getAttribute('data-sent') || 'Thank you. Your message has gone to the mandir.'));
      if (note) box.appendChild(el('p', 'form-result__note', note));
    } else {
      if (T.staging) box.appendChild(el('p', 'form-result__test', 'Test site · nothing was sent'));
      box.appendChild(el('p', 'form-result__h', mode === 'failed' ? 'That didn’t go through. Please send it yourself.' : 'Almost there: send this to the mandir'));
      box.appendChild(el('p', 'form-result__note', T.staging
        ? 'On the finished site this goes straight to the mandir. For now, here is what they would receive:'
        : 'Copy these details and email them to the mandir, or call the seva desk (8 AM–6 PM daily).'));
      var pre = el('pre', 'form-result__sum', text); pre.setAttribute('data-copy-text', '');
      var scope = el('div', ''); scope.setAttribute('data-copy-scope', ''); scope.appendChild(pre);
      var btns = el('div', 'btns');
      var cb = el('button', 'btn btn--sm', 'Copy the details'); cb.type = 'button'; cb.setAttribute('data-copy', text);
      btns.appendChild(cb); scope.appendChild(btns); box.appendChild(scope);
      var to = el('div', 'form-result__to');
      var p1 = el('p', ''); p1.appendChild(el('strong', '', 'Email ')); p1.appendChild(copyLine(D.contact.email, 'mailto:' + D.contact.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'))));
      var p2 = el('p', ''); p2.appendChild(el('strong', '', 'Phone ')); p2.appendChild(copyLine(D.contact.phone, 'tel:' + D.contact.phone_e164));
      to.appendChild(p1); to.appendChild(p2); box.appendChild(to);
    }
    box.hidden = false;
    box.focus({ preventScroll: true });
    box.scrollIntoView({ behavior: T.behavior(), block: 'nearest' });
    T.say(box.querySelector('.form-result__h').textContent);
  }

  /* a message under a field goes as soon as the field is put right: typing (input) or choosing (change; a script that
     picks an option, such as "Enquire" on the seva page, sends change) */
  function recheck(e) {
    var t = e.target;
    if (!t || !t.getAttribute) return;
    if (t.getAttribute('aria-invalid') === 'true') showError(t, errorFor(t));
    var fs = (t.type === 'radio' || t.type === 'checkbox') && t.closest('fieldset[data-required]');
    if (fs && T.qsa('input', fs).some(function (i) { return i.checked; })) {
      var m = fs.querySelector(':scope > .field__err');
      if (m) m.remove();
    }
  }

  T.qsa('form[data-form]').forEach(function (form) {
    /* the page checks the fields itself (its own messages); without this script the browser's checks still apply */
    form.noValidate = true;
    form.addEventListener('input', recheck);
    form.addEventListener('change', recheck);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      /* a new attempt: the last result (a thank-you, or a summary) goes until this one has its own */
      var old = form.querySelector('[data-form-result]');
      if (old) old.hidden = true;
      var first = null;
      T.qsa('input, select, textarea', form).forEach(function (c) {
        if (!c.name || c.type === 'hidden' || c.disabled) return;
        if (c.type === 'radio') { return; }
        var msg = errorFor(c); showError(c, msg); if (msg && !first) first = c;
      });
      T.qsa('fieldset[data-required]', form).forEach(function (fs) {
        var any = T.qsa('input', fs).some(function (i) { return i.checked; });
        var m = fs.querySelector('.field__err');
        if (!any) { if (!m) { m = el('span', 'field__err'); fs.appendChild(m); } m.textContent = 'Please choose one.'; if (!first) first = fs.querySelector('input'); }
        else if (m) m.remove();
      });
      if (first) { first.focus(); return; }
      var lines = T.formSummary(form);
      var endpoint = D.forms && D.forms.endpoint;
      if (endpoint && !T.staging && window.fetch) {
        var btn = form.querySelector('[type="submit"]'); if (btn) btn.disabled = true;
        var hp = form.querySelector('[name="_hp"]');
        var mail = form.querySelector('input[type="email"]');
        var nameEl = form.querySelector('input[name="name"]');
        var payload = { form: form.getAttribute('data-form') || form.id, subject: form.getAttribute('data-subject') || 'Website form',
          page: location.pathname, lines: lines, reply_to: mail ? mail.value.trim() : '', name: nameEl ? nameEl.value.trim() : '', _hp: hp ? hp.value : '' };
        fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) })
          .then(function (r) { if (!r.ok) throw new Error(r.status); showResult(form, 'sent', lines); form.reset(); })
          .catch(function () { showResult(form, 'failed', lines); })
          .then(function () { if (btn) btn.disabled = false; });
      } else {
        showResult(form, 'summary', lines);
      }
    });
  });
})();
