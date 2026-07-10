/**
 * HTML 示例统一 GUI：在宿主左上角浮层挂载 lil-gui，独立打开时回退到页面内浮层
 */
(function () {
  "use strict";

  var MOUNT_ID = "example-gui-mount";
  var FALLBACK_ID = "example-gui-fallback";
  var DEFAULT_TOOLBAR_ID = "toolbar";

  var guiInstance = null;
  var defaultAction = null;
  var buttonCounter = 0;
  var toggleCounter = 0;
  var sliderCounter = 0;
  var menuCounter = 0;
  var textInputCounter = 0;
  var numberInputCounter = 0;
  var activeControl = null;

  function getHost() {
    try {
      if (window.parent && window.parent !== window) {
        return window.parent.__htmlExampleGuiHost__;
      }
    } catch (e) {
      return null;
    }
    return null;
  }

  function useHostDelegation() {
    var host = getHost();
    return !!(host && host.isDelegated);
  }

  function delegateToHost(method) {
    return function () {
      var host = getHost();
      if (!host || typeof host[method] !== "function") {
        return;
      }
      return host[method].apply(host, arguments);
    };
  }

  function getPanelMount() {
    var host = getHost();
    if (host && typeof host.getMount === "function") {
      return host.getMount();
    }

    try {
      if (window.parent && window.parent !== window) {
        return window.parent.document.getElementById(MOUNT_ID);
      }
    } catch (e) {
      return null;
    }

    return null;
  }

  function getFallbackMount() {
    var mount = document.getElementById(FALLBACK_ID);
    if (!mount) {
      mount = document.createElement("div");
      mount.id = FALLBACK_ID;
      mount.className = "example-gui-fallback";
      document.body.appendChild(mount);
    }
    return mount;
  }

  function getLilGuiClass() {
    if (!window.lil) {
      return null;
    }
    return window.lil.GUI || window.lil.default;
  }

  function notifyControlsReady() {
    var host = getHost();
    if (host && typeof host.notifyControlsReady === "function") {
      host.notifyControlsReady();
    }
  }

  function ensureGui() {
    if (guiInstance) {
      return guiInstance;
    }

    var GUI = getLilGuiClass();
    if (!GUI) {
      return null;
    }

    var panelMount = getPanelMount();
    var mount = panelMount || getFallbackMount();
    var host = getHost();
    var title =
      (host && typeof host.getTitle === "function" && host.getTitle()) ||
      document.title ||
      "示例参数";

    mount.innerHTML = "";
    guiInstance = new GUI({
      container: mount,
      title: title,
    });

    return guiInstance;
  }

  function getToolbar(toolbarID) {
    var id = toolbarID || DEFAULT_TOOLBAR_ID;
    var toolbar = document.getElementById(id);
    if (!toolbar) {
      toolbar = document.createElement("div");
      toolbar.id = id;
      document.body.appendChild(toolbar);
    }
    return toolbar;
  }

  function clearActive() {
    if (activeControl) {
      activeControl.classList.remove("example-gui-control--active");
      activeControl = null;
    }
  }

  function markActive(control) {
    clearActive();
    if (control) {
      activeControl = control;
      control.classList.add("example-gui-control--active");
    }
  }

  function createToolbarButton(text, onclick) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "cesium-button";
    button.textContent = text;
    button.onclick = function () {
      markActive(button);
      onclick();
    };
    return button;
  }

  function addToolbarButtonFallback(text, onclick, toolbarID) {
    getToolbar(toolbarID).appendChild(createToolbarButton(text, onclick));
    notifyControlsReady();
  }

  window.ExampleGui = {
    reset: function () {
      if (useHostDelegation()) {
        return delegateToHost("reset")();
      }
      clearActive();
    },

    finishedLoading: function () {
      if (useHostDelegation()) {
        return delegateToHost("finishedLoading")();
      }
      ExampleGui.reset();
      if (defaultAction) {
        defaultAction();
        defaultAction = null;
      }
    },

    addButton: function (text, onclick, toolbarID) {
      if (useHostDelegation()) {
        return delegateToHost("addButton")(text, onclick, toolbarID);
      }
      var gui = ensureGui();
      if (!gui) {
        addToolbarButtonFallback(text, onclick, toolbarID);
        return;
      }

      buttonCounter += 1;
      var key = "__btn" + buttonCounter;
      var actions = {};
      actions[key] = onclick;
      gui.add(actions, key).name(text);
      notifyControlsReady();
    },

    addToolbarButton: function (text, onclick, toolbarID) {
      ExampleGui.addButton(text, onclick, toolbarID);
    },

    addDefaultButton: function (text, onclick, toolbarID) {
      ExampleGui.addButton(text, onclick, toolbarID);
      defaultAction = onclick;
    },

    addDefaultToolbarButton: function (text, onclick, toolbarID) {
      ExampleGui.addDefaultButton(text, onclick, toolbarID);
    },

    addToggleButton: function (text, checked, onchange, toolbarID) {
      if (useHostDelegation()) {
        return delegateToHost("addToggleButton")(text, checked, onchange, toolbarID);
      }
      var gui = ensureGui();
      if (!gui) {
        var input = document.createElement("input");
        input.checked = checked;
        input.type = "checkbox";
        input.style.pointerEvents = "none";

        var label = document.createElement("label");
        label.appendChild(input);
        label.appendChild(document.createTextNode(text));
        label.style.pointerEvents = "none";

        var button = document.createElement("button");
        button.type = "button";
        button.className = "cesium-button example-gui-toggle";
        button.onclick = function () {
          markActive(button);
          input.checked = !input.checked;
          onchange(input.checked);
        };
        button.appendChild(label);
        getToolbar(toolbarID).appendChild(button);
        notifyControlsReady();
        return;
      }

      toggleCounter += 1;
      var toggleKey = "__toggle" + toggleCounter;
      var state = {};
      state[toggleKey] = checked;
      gui.add(state, toggleKey).name(text).onChange(onchange);
      notifyControlsReady();
    },

    addTextInput: function (text, object, property, onchange, toolbarID) {
      if (useHostDelegation()) {
        return delegateToHost("addTextInput")(text, object, property, onchange, toolbarID);
      }
      var gui = ensureGui();
      if (!gui) {
        var textWrap = document.createElement("div");
        textWrap.className = "example-gui-text";

        var textLabel = document.createElement("label");
        textLabel.textContent = text + " ";

        var textInput = document.createElement("input");
        textInput.type = "text";
        textInput.value = object[property] != null ? String(object[property]) : "";
        textInput.oninput = function () {
          object[property] = textInput.value;
          if (typeof onchange === "function") {
            onchange(textInput.value);
          }
        };

        textLabel.appendChild(textInput);
        textWrap.appendChild(textLabel);
        getToolbar(toolbarID).appendChild(textWrap);
        notifyControlsReady();
        return;
      }

      textInputCounter += 1;
      var textKey = property || "__text" + textInputCounter;
      if (!(textKey in object)) {
        object[textKey] = "";
      }
      var textController = gui.add(object, textKey).name(text);
      if (typeof onchange === "function") {
        textController.onChange(onchange);
      }
      notifyControlsReady();
    },

    addNumberInput: function (text, object, property, min, max, step, onchange, toolbarID) {
      if (useHostDelegation()) {
        return delegateToHost("addNumberInput")(
          text,
          object,
          property,
          min,
          max,
          step,
          onchange,
          toolbarID,
        );
      }
      var numberGui = ensureGui();
      if (!numberGui) {
        var numberWrap = document.createElement("div");
        numberWrap.className = "example-gui-number";

        var numberLabel = document.createElement("label");
        numberLabel.textContent = text + " ";

        var numberInput = document.createElement("input");
        numberInput.type = "number";
        if (min != null) {
          numberInput.min = String(min);
        }
        if (max != null) {
          numberInput.max = String(max);
        }
        if (step != null) {
          numberInput.step = String(step);
        }
        numberInput.value = object[property] != null ? String(object[property]) : "0";
        numberInput.oninput = function () {
          object[property] = Number(numberInput.value);
          if (typeof onchange === "function") {
            onchange(Number(numberInput.value));
          }
        };

        numberLabel.appendChild(numberInput);
        numberWrap.appendChild(numberLabel);
        getToolbar(toolbarID).appendChild(numberWrap);
        notifyControlsReady();
        return;
      }

      numberInputCounter += 1;
      var numberKey = property || "__number" + numberInputCounter;
      if (!(numberKey in object)) {
        object[numberKey] = 0;
      }
      var numberController = numberGui.add(object, numberKey, min, max, step).name(text);
      if (typeof onchange === "function") {
        numberController.onChange(onchange);
      }
      notifyControlsReady();
    },

    addSlider: function (text, value, min, max, step, onchange, toolbarID) {
      if (useHostDelegation()) {
        return delegateToHost("addSlider")(text, value, min, max, step, onchange, toolbarID);
      }
      var gui = ensureGui();
      if (!gui) {
        var input = document.createElement("input");
        input.type = "range";
        input.min = min;
        input.max = max;
        input.step = step;
        input.value = value;

        var label = document.createElement("label");
        label.textContent = text + " ";
        label.appendChild(input);

        var wrap = document.createElement("div");
        wrap.className = "example-gui-slider";
        wrap.appendChild(label);
        input.oninput = function () {
          onchange(Number(input.value));
        };
        getToolbar(toolbarID).appendChild(wrap);
        notifyControlsReady();
        return;
      }

      sliderCounter += 1;
      var sliderKey = "__slider" + sliderCounter;
      var state = {};
      state[sliderKey] = value;
      var controller = gui.add(state, sliderKey, min, max, step).name(text);
      controller.onChange(onchange);
      notifyControlsReady();
    },

    addMenu: function (options, toolbarID) {
      if (useHostDelegation()) {
        return delegateToHost("addMenu")(options, toolbarID);
      }
      var gui = ensureGui();
      if (!gui) {
        var menu = document.createElement("select");
        menu.className = "cesium-button";

        for (var i = 0, len = options.length; i < len; i++) {
          var option = document.createElement("option");
          option.textContent = options[i].text;
          if (options[i].value !== undefined) {
            option.value = options[i].value;
          }
          menu.appendChild(option);
        }

        menu.onchange = function () {
          ExampleGui.reset();
          markActive(menu);
          var item = options[menu.selectedIndex];
          if (item && typeof item.onselect === "function") {
            item.onselect();
          }
        };

        getToolbar(toolbarID).appendChild(menu);
        notifyControlsReady();
        return;
      }

      var texts = [];
      for (var j = 0; j < options.length; j++) {
        texts.push(options[j].text);
      }

      menuCounter += 1;
      var menuKey = "__menu" + menuCounter;
      var menuState = {};
      menuState[menuKey] = texts[0] || "";

      gui
        .add(menuState, menuKey, texts)
        .name("选项 " + menuCounter)
        .onChange(function (value) {
          for (var k = 0; k < options.length; k++) {
            if (options[k].text === value && typeof options[k].onselect === "function") {
              options[k].onselect();
              break;
            }
          }
        });

      if (!defaultAction && options[0] && typeof options[0].onselect === "function") {
        defaultAction = options[0].onselect;
      }

      notifyControlsReady();
    },

    addToolbarMenu: function (options, toolbarID) {
      ExampleGui.addMenu(options, toolbarID);
    },

    addDefaultMenu: function (options, toolbarID) {
      ExampleGui.addMenu(options, toolbarID);
      if (options[0] && typeof options[0].onselect === "function") {
        defaultAction = options[0].onselect;
      }
    },

    addDefaultToolbarMenu: function (options, toolbarID) {
      ExampleGui.addDefaultMenu(options, toolbarID);
    },

    /** 销毁当前 GUI 实例（路由切换时由宿主调用） */
    destroy: function () {
      if (useHostDelegation()) {
        return delegateToHost("destroy")();
      }
      if (guiInstance && typeof guiInstance.destroy === "function") {
        guiInstance.destroy();
      }
      guiInstance = null;
      defaultAction = null;
      buttonCounter = 0;
      toggleCounter = 0;
      sliderCounter = 0;
      menuCounter = 0;
      textInputCounter = 0;
      numberInputCounter = 0;
      clearActive();
    },
  };

  window.addEventListener("beforeunload", function () {
    ExampleGui.destroy();
  });
})();
