import * as vscode from 'vscode';
import * as path from 'path';
import { IConfiguration } from './iconfiguration';

class DecorationImpl {
  private _mark: vscode.TextEditorDecorationType;
  private _default: vscode.TextEditorDecorationType;
  private _searchHighlight: vscode.TextEditorDecorationType;
  private _easyMotion: vscode.TextEditorDecorationType;

  public set mark(value: vscode.TextEditorDecorationType) {
    this._mark = value;
  }

  public get mark() {
    return this._mark;
  }

  public set Default(value: vscode.TextEditorDecorationType) {
    if (this._default) {
      this._default.dispose();
    }
    this._default = value;
  }

  public get Default() {
    return this._default;
  }

  public set SearchHighlight(value: vscode.TextEditorDecorationType) {
    if (this._searchHighlight) {
      this._searchHighlight.dispose();
    }
    this._searchHighlight = value;
  }

  public get SearchHighlight() {
    return this._searchHighlight;
  }

  public set EasyMotion(value: vscode.TextEditorDecorationType) {
    if (this._easyMotion) {
      this._easyMotion.dispose();
    }
    this._easyMotion = value;
  }

  public get EasyMotion() {
    return this._easyMotion;
  }

  public load(configuration: IConfiguration) {
    this.Default = vscode.window.createTextEditorDecorationType({
      backgroundColor: new vscode.ThemeColor('editorCursor.foreground'),
      borderColor: new vscode.ThemeColor('editorCursor.foreground'),
      dark: {
        color: 'rgb(81,80,82)',
      },
      light: {
        // used for light colored themes
        color: 'rgb(255, 255, 255)',
      },
      borderStyle: 'solid',
      borderWidth: '1px',
    });

    this.mark = vscode.window.createTextEditorDecorationType(<vscode.DecorationRenderOptions>{
      isWholeLine: false,
      gutterIconPath: path.join(__filename, '..', '..', '..', '..', 'images', 'mark.svg'),
      gutterIconSize: 'cover',
    });

    const searchHighlightColor = configuration.searchHighlightColor
      ? configuration.searchHighlightColor
      : new vscode.ThemeColor('editor.findMatchHighlightBackground');

    this.SearchHighlight = vscode.window.createTextEditorDecorationType({
      backgroundColor: searchHighlightColor,
      color: configuration.searchHighlightTextColor,
      overviewRulerColor: new vscode.ThemeColor('editorOverviewRuler.findMatchForeground'),
    });

    this.EasyMotion = vscode.window.createTextEditorDecorationType({
      backgroundColor: searchHighlightColor,
    });
  }
}

export const decoration = new DecorationImpl();
